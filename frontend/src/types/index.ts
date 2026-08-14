export interface Product {
  id: string;
  shopifyId: string;
  title: string;
  price: number;
  sku: string | null;
  inventoryQty: number;
  vendor: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookLog {
  id: string;
  webhookId: string;
  topic: string;
  shop: string;
  status: "OK" | "ERROR" | "DUPLICATE";
  receivedAt: string;
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
    receivedAt: string;
    status: string;
  } | null;
}
