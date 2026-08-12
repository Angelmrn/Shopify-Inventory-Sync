import { getProducts, getStats, getWebhookLogs } from "@/lib/api";
import StatsCard from "@/components/StatsCards";
import SyncButton from "@/components/SyncButton";
import ProductsTable from "@/components/ProductsTable";
import WebhookHistory from "@/components/WebhookHistory";
import { GrSync } from "react-icons/gr";

export default async function DashboardPage() {
  const [productsRes, stats, logsRes] = await Promise.all([
    getProducts(),
    getStats(),
    getWebhookLogs(),
  ]);

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Inventory Sync
          </h1>
          <GrSync className="w-7 h-7" />
        </div>
        <SyncButton />
      </div>
      <StatsCard stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4 bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Products Catalog
            </h2>
            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
              {productsRes.products.length} items
            </span>
          </div>
          <ProductsTable products={productsRes.products} />
        </div>
        <div className="space-y-4 bg-card border rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Live Webhooks
            </h2>
            <span className="text-xs font-mono text-muted-foreground">
              Real-time
            </span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-125">
            <WebhookHistory logs={logsRes.logs} />
          </div>
        </div>
      </div>
    </div>
  );
}
