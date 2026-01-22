import express from "express";
import { getRekomendasi } from "../controllers/rekomendasiController.js";

const router = express.Router();

router.get("/rekomendasi", getRekomendasi);

export default router;
