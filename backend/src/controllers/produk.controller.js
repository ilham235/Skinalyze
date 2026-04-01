import db from "../config/mysql.js";

/* ================= TAMBAH PRODUK ================= */
export const createProduk = async (req, res) => {
  try {
    const { nama_produk, kategori, masalah_kulit, harga, stok } = req.body;
    const gambar = req.file ? req.file.filename : "default.png";

    const sql = `
      INSERT INTO produk
      (nama_produk, kategori, masalah_kulit, harga, stok, gambar)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      nama_produk,
      kategori,
      masalah_kulit,
      harga,
      stok,
      gambar,
    ]);

    res.json({ message: "Produk berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ================= LIST PRODUK ================= */
export const getAllProducts = async (req, res) => {
  try {
    console.log("📦 GET ALL PRODUCTS HIT");
    const [rows] = await db.query(
      "SELECT * FROM produk ORDER BY created_at DESC"
    );
    console.log("📦 RESULT:", rows);
    res.json(rows);
  } catch (err) {
    console.error("❌ GET PRODUCTS ERROR:", err);
    res.status(500).json({ message: "Gagal mengambil produk" });
  }
};


/* ================= UPDATE STOK ================= */
export const updateStok = async (req, res) => {
  try {
    const { stok } = req.body;
    const { id } = req.params;

    await db.query(
      "UPDATE produk SET stok = ? WHERE produk_id = ?",
      [stok, id]
    );

    res.json({ message: "Stok berhasil diupdate" });
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ================= DELETE PRODUK ================= */
export const deleteProduk = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM produk WHERE produk_id = ?", [id]);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json(err);
  }
};
