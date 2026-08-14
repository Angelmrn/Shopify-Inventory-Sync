import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/types";

export default function StatsCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            Total products
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          <p>{stats.totalProducts}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            Out of stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.outOfStockProducts}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            Last Sync
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {stats.lastSync
              ? new Date(stats.lastSync.startedAt).toLocaleString("es-MX")
              : "Nunca"}
          </p>
          {stats.lastSync && (
            <p className="text-xs text-muted-foreground">
              {stats.lastSync.productsSynced} Products
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            Last webhook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {stats.lastWebhook
              ? new Date(stats.lastWebhook.receivedAt).toLocaleString("es-MX")
              : "Ninguno"}
          </p>
          {stats.lastWebhook && (
            <p className="text-xs text-muted-foreground">
              {stats.lastWebhook.topic}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
