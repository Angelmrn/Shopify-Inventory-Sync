import { Request, Response, NextFunction } from "express";
import { verifyShopifyHmac } from "../services/hmac.service";

export interface WebhookRequest extends Request {
  rawBody?: Buffer;
}

export const verifyWebhook = (
  req: WebhookRequest,
  res: Response,
  next: NextFunction,
) => {
  const hmacHeader = req.headers["x-shopify-hmac-sha256"] as string;
  if (!req.rawBody) {
    return res.status(400).json({ message: "Missing raw body" });
  }

  const isValid = verifyShopifyHmac(req.rawBody, hmacHeader);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid webhook signature" });
  }

  next();
};
