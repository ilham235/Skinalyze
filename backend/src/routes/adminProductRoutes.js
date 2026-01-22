import express from "express";
import multer from "multer";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminProductController.js";

const router = express.Router();

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

/* ================= ROUTES ================= */
router.get("/", getAllProducts);
router.post("/", upload.single("gambar"), addProduct);

// 🔧 UPDATE PRODUK (TERMASUK GAMBAR)
router.put("/:produk_id", upload.single("gambar"), updateProduct);

// 🗑 DELETE PRODUK
router.delete("/:produk_id", deleteProduct);

export default router;
