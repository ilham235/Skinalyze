import db from "../config/mysql.js";
import fs from "fs";
import path from "path";

/* ===============================
   GET ALL PRODUCTS
================================ */
export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM produk ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil produk", error: err });
  }
};

/* ===============================
   ADD PRODUCT
================================ */
export const addProduct = async (req, res) => {
  try {
    const { nama_produk, kategori, masalah_kulit, harga, stok } = req.body;
    const gambar = req.file ? req.file.filename : "default.png";

    await db.query(
      `INSERT INTO produk 
      (nama_produk, kategori, masalah_kulit, harga, stok, gambar)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [nama_produk, kategori, masalah_kulit, harga, stok, gambar]
    );

    res.json({ message: "Produk berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambah produk", error: err });
  }
};

/* ===============================
   UPDATE PRODUCT
================================ */
export const updateProduct = async (req, res) => {
  try {
    const { produk_id } = req.params;
    const { nama_produk, kategori, masalah_kulit, stok } = req.body;

    let gambarQuery = "";
    let params = [nama_produk, kategori, masalah_kulit, stok];

    // Ambil gambar lama
    const [[produk]] = await db.query(
      "SELECT gambar FROM produk WHERE produk_id = ?",
      [produk_id]
    );

    if (req.file) {
      // Hapus gambar lama
      if (produk.gambar && produk.gambar !== "default.png") {
        const oldPath = path.join("uploads", produk.gambar);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      gambarQuery = ", gambar = ?";
      params.push(req.file.filename);
    }

    params.push(produk_id);

    await db.query(
      `UPDATE produk 
       SET nama_produk=?, kategori=?, masalah_kulit=?, stok=? ${gambarQuery}
       WHERE produk_id=?`,
      params
    );

    res.json({ message: "Produk berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: "Gagal update produk", error: err });
  }
};

/* ===============================
   DELETE PRODUCT
================================ */
export const deleteProduct = async (req, res) => {
  try {
    const { produk_id } = req.params;

    const [[produk]] = await db.query(
      "SELECT gambar FROM produk WHERE produk_id = ?",
      [produk_id]
    );

    if (produk?.gambar && produk.gambar !== "default.png") {
      const imgPath = path.join("uploads", produk.gambar);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await db.query("DELETE FROM produk WHERE produk_id = ?", [produk_id]);

    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus produk", error: err });
  }
};
