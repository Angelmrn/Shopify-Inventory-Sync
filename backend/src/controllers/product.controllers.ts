import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { updatedAt: "desc" },
    });
    res.json({ products });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return res.status(500).json({ message: "All Products failed" });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalProducts = await prisma.product.count();
    const outOfStockProducts = await prisma.product.count({
      where: { inventoryQty: 0 },
    });
    const lastSync = await prisma.syncHistory.findFirst({
      orderBy: { startedAt: "desc" },
    });

    const lastWebhook = await prisma.webhookLog.findFirst({
      orderBy: { receivedAt: "desc" },
    });

    res.json({
      totalProducts,
      outOfStockProducts,
      lastSync,
      lastWebhook,
    });
  } catch (error) {
    console.error("Error in getDashboard stats:", error);
    return res.status(500).json({ message: "Dashboard Stats Failed" });
  }
};
