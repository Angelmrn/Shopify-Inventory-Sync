import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { fetchAllShopifyProducts } from "../services/shopify.service";

export const syncAllProducts = async (req: Request, res: Response) => {
  const syncRecord = await prisma.syncHistory.create({
    data: { type: "MANUAL" },
  });

  try {
    const shopifyProducts = await fetchAllShopifyProducts();
    //Extraemos el numero del id
    const extractId = (gid: string) => gid.split("/").pop()!;
    for (const product of shopifyProducts) {
      const variant = product.variants.edges[0].node;

      await prisma.product.upsert({
        where: { shopifyId: extractId(product.id) },
        update: {
          title: product.title,
          price: parseFloat(variant?.price ?? "0"),
          sku: variant?.sku ?? null,
          inventoryQty: variant?.inventoryQuantity ?? 0,
          vendor: product.vendor,
          status: product.status.toLowerCase(),
        },
        create: {
          shopifyId: extractId(product.id),
          title: product.title,
          price: parseFloat(variant?.price ?? "0"),
          sku: variant?.sku ?? null,
          inventoryQty: variant?.inventoryQuantity ?? 0,
          vendor: product.vendor,
          status: product.status.toLowerCase(),
        },
      });
    }
    await prisma.syncHistory.update({
      where: { id: syncRecord.id },
      data: {
        productsSynced: shopifyProducts.length,
        finishedAt: new Date(),
      },
    });
    return res.json({
      message: "Sync Completed",
      productsSynced: shopifyProducts.length,
    });
  } catch (error) {
    console.error("Sync Error:", error);
    return res.status(500).json({ message: "Sync Failed" });
  }
};
