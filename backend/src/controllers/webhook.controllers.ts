import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const handleProductWebhook = async (req: Request, res: Response) => {
  const topic = req.headers["x-shopify-topic"] as string;
  const shop = req.headers["x-shopify-shop-domain"] as string;
  const webhookId = req.headers["x-shopify-webhook-id"] as string;
  try {
    //Idempotencia
    const existing = await prisma.webhookLog.findUnique({
      where: { webhookId },
    });

    if (existing) {
      return res
        .status(200)
        .json({ message: "Duplicate webhook. already processed" });
    }

    const productData = req.body;

    // Upsert — si el producto existe lo actualiza, si no lo crea
    await prisma.product.upsert({
      where: { shopifyId: String(productData.id) },
      update: {
        title: productData.title,
        price: parseFloat(productData.variants?.[0]?.price ?? "0"),
        sku: productData.variants?.[0]?.sku ?? null,
        inventoryQty: productData.variants?.[0]?.inventory_quantity ?? 0,
        vendor: productData.vendor ?? null,
        status: productData.status ?? "active",
      },
      create: {
        shopifyId: String(productData.id),
        title: productData.title,
        price: parseFloat(productData.variants?.[0]?.price ?? "0"),
        sku: productData.variants?.[0]?.sku ?? null,
        inventoryQty: productData.variants?.[0]?.inventory_quantity ?? 0,
        vendor: productData.vendor ?? null,
        status: productData.status ?? "active",
      },
    });

    //Registrara el historial
    await prisma.webhookLog.create({
      data: {
        webhookId,
        topic,
        shop,
        payload: productData,
        status: "OK",
      },
    });
    return res.status(200).json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    await prisma.webhookLog
      .create({
        data: {
          webhookId: webhookId || `error-${Date.now()}`,
          topic,
          shop,
          payload: req.body,
          status: "ERROR",
        },
      })
      .catch(() => {});
    return res.status(500).json({ message: "Server error" });
  }
};

export const getWebhookLogs = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.webhookLog.findMany({
      orderBy: { receivedAt: "desc" },
    });
    res.json({ logs });
  } catch (error) {
    console.error("Error fetching webhook logs:", error);
    return res.status(500).json({ message: "Failed to fetch webhook logs" });
  }
};
