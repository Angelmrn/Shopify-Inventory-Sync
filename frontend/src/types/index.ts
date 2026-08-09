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
  recicedAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  outOfStockProducts: number;
  lastSync: {
    startedAt: string;
    finishedAt: string;
    productsSynced: number;
  } | null;
  lasWebhook: {
    topic: string;
    receivedAt: string;
    status: string;
  } | null;
}
