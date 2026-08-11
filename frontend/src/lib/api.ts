const BASE_URL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL || "http://backend:4000"
    : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
  return response.json();
}

export async function getStats() {
  const response = await fetch(`${BASE_URL}/products/stats`, {
    cache: "no-store",
  });
  return response.json();
}

export async function getWebhookLogs() {
  const response = await fetch(`${BASE_URL}/webhooks/logs`, {
    cache: "no-store",
  });
  return response.json();
}

export async function triggerSync() {
  const response = await fetch(`${BASE_URL}/sync`, { method: "POST" });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Sync failed: ${response.status} - ${text}`);
  }
  return response.json();
}
