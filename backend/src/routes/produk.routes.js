import express from "express";
import upload from "../middleware/upload.js";
import {
  createProduk,
  getAllProduk,
  updateStok,
  deleteProduk,
} from "../controllers/produk.controller.js";

const router = express.Router();

router.post("/", upload.single("gambar"), createProduk);
router.get("/", getAllProduk);
router.put("/:id/stok", updateStok);
router.delete("/:id", deleteProduk);

export default router;
