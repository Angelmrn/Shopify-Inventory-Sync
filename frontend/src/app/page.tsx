import { getProducts, getStats, getWebhookLogs } from "@/lib/api";
import StatsCard from "@/components/StatsCards";
import SyncButton from "@/components/SyncButton";
import ProductsTable from "@/components/ProductsTable";
import WebhookHistory from "@/components/WebhookHistory";

export default async function DashboardPage() {
  const [productsRes, stats, logsRes] = await Promise.all([
    getProducts(),
    getStats(),
    getWebhookLogs(),
  ]);
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shopify Inventory Sync</h1>
        <SyncButton />
      </div>

      <StatsCard stats={stats} />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Productos</h2>
        <ProductsTable products={productsRes.products} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Historial de webhooks</h2>
        <WebhookHistory logs={logsRes.logs} />
      </div>
    </div>
  );
}
