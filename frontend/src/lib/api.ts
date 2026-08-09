const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  return response.json();
}
