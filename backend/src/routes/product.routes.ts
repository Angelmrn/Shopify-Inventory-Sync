import { Router } from "express";
import {
  getAllProducts,
  getDashboadStats,
} from "../controllers/product.controllers";

const router = Router();

router.get("/", getAllProducts);
router.get("/stats", getDashboadStats);

export default router;
