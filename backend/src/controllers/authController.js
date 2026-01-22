import db from "../config/mysql.js";

/* ================= REGISTER ================= */

export const register = async (req, res) => {

  // 🔴 WAJIB TAMBAHKAN LOG INI (BARIS PERTAMA)
  console.log("REQ BODY REGISTER:", req.body);

  const { uid, nama, email } = req.body;

  // 🔴 VALIDASI
  if (!uid || !nama || !email) {
    return res.status(400).json({
      error: "Data tidak lengkap",
      received: req.body, // ⬅️ bantu debug
    });
  }

  try {
    await db.query(
      "INSERT INTO users (user_id, nama, email) VALUES (?, ?, ?)",
      [uid, nama, email]
    );

    // ✅ RESPONSE KE FRONTEND
    return res.status(201).json({
      user_id: uid,
      nama,
      email,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        error: "Email sudah terdaftar",
      });
    }

    return res.status(500).json({
      error: "Gagal register user",
    });
  }
};

/* ================= LOGIN ================= */

export const login = async (req, res) => {

  // 🔴 WAJIB TAMBAHKAN LOG INI
  console.log("REQ BODY LOGIN:", req.body);

  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({
      error: "UID tidak ada",
    });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE user_id = ?",
      [uid]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "User tidak ditemukan",
      });
    }

    return res.json(rows[0]);

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      error: "Login gagal",
    });
  }
};
