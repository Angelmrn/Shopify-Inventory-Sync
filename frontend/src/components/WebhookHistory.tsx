import { WebhookLog } from "@/types";
import { Badge } from "@/components/ui/badge";

export default function WebhookHistory({ logs }: { logs: WebhookLog[] }) {
  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <div
          key={log.id}
          className="flex items-center justify-between border rounded-lg p-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {new Date(log.recivedAt).toLocaleTimeString("es-MX")}
            </span>
            <span className="text-sm font-medium">{log.topic}</span>
          </div>
          <Badge variant={log.status === "OK" ? "secondary" : "destructive"}>
            {log.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}
