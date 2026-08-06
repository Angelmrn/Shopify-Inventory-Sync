import crypto from "crypto";

export function verifyShopifyHmac(
  rawBody: Buffer,
  hmacHeader: string | undefined,
): boolean {
  if (!hmacHeader) return false;

  const generatedHash = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET!)
    .update(rawBody)
    .digest("base64");
  // timingSafeEqual evita timing attacks al comparar strings sensibles
  try {
    return crypto.timingSafeEqual(
      Buffer.from(generatedHash),
      Buffer.from(hmacHeader),
    );
  } catch (err) {
    console.log("Error en timingSafeEqual:", err);
    return false;
  }
}
