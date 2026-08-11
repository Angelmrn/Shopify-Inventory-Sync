export interface Product {
  id: string;
  shopifyId: string;
  title: string;
  price: number;
  sku: string;
  inventoryQty: number;
  vendor: string;
  status: string;
  createAt: string;
  updatedAt: string;
}

export interface WebhookLog {
  id: string;
  webhookId: string;
  topic: string;
  shop: string;
  status: "OK" | "ERROR" | "DUPLICATE";
  recivedAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  outOfStockProducts: number;
  lastSync: {
    startedAt: string;
    finishedAt: string;
    productsSynced: number;
  } | null;
  lastWebhook: {
    topic: string;
    recivedAt: string;
    status: string;
  } | null;
}
