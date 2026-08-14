import { Router } from "express";
import {
  getAllProducts,
  getDashboardStats,
} from "../controllers/product.controllers";

const router = Router();

router.get("/", getAllProducts);
router.get("/stats", getDashboardStats);

export default router;
