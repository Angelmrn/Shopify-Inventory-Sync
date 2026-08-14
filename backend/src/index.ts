import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import webhookRoutes from "./routes/webhook.routes";
import { WebhookRequest } from "./middleware/verifyWebhook";
import syncRoutes from "./routes/sync.routes";
import productRoutes from "./routes/product.routes";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

// Captura el rawBody solo para las rutas de webhooks
app.use(
  "/webhooks",
  express.json({
    verify: (req: WebhookRequest, res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.json());
app.use("/webhooks", webhookRoutes);
app.use("/sync", syncRoutes);
app.use("/products", productRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Shopify Inventory Sync API is running" });
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
  },
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
