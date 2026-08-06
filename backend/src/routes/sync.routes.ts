import { Router } from "express";
import { syncAllProducts } from "../controllers/sync.controllers";

const router = Router();

router.post("/", syncAllProducts);

export default router;
