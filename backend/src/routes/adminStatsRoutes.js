import express from "express";
import { getSalesStats } from "../controllers/adminStatsController.js";

const router = express.Router();

router.get("/sales", getSalesStats);

export default router;
