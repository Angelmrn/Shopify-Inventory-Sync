import { Router } from "express";
import {
  handleProductWebhook,
  getWebhookLogs,
} from "../controllers/webhook.controllers";
import { verifyWebhook } from "../middleware/verifyWebhook";

const router = Router();

router.post("/products-update", verifyWebhook, handleProductWebhook);
router.get("/logs", getWebhookLogs);
export default router;
