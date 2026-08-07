import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
  });
  res.json(products);
};

export const getDashboadStats = async (req: Request, res: Response) => {
  const totalProducts = await prisma.product.count();
  const outOfStockProducts = await prisma.product.count({
    where: { inventoryQty: 0 },
  });
  const lastSync = await prisma.syncHistory.findFirst({
    orderBy: { startedAt: "desc" },
  });

  const lastWebhook = await prisma.webhookLog.findFirst({
    orderBy: { recivedAt: "desc" },
  });

  res.json({
    totalProducts,
    outOfStockProducts,
    lastSync,
    lastWebhook,
  });
};
