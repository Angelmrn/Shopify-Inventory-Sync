import { Router } from "express";
import { handleProductWebhook } from "../controllers/webhook.controllers";
import { verifyWebhook } from "../middleware/verifyWebhook";

const router = Router();

router.post("/products-update", verifyWebhook, handleProductWebhook);
export default router;
