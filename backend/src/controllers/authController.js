import db from "../config/mysql.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  const { uid, nama, email } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  try {
    const [existing] = await db.query(
      "SELECT id FROM users WHERE firebase_uid = ?",
      [uid]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "User sudah terdaftar" });
    }

    await db.query(
      "INSERT INTO users (firebase_uid, nama, email, role) VALUES (?, ?, ?, ?)",
      [uid, nama || email, email, "user"]
    );

    res.status(201).json({ message: "Register sukses" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Register gagal" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  const { uid, email } = req.body;

  if (!uid) {
    return res.status(400).json({ message: "UID tidak ada" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE firebase_uid = ?",
      [uid]
    );

    let user;

    if (rows.length === 0) {
      // USER BARU → DEFAULT USER
      const [result] = await db.query(
        "INSERT INTO users (firebase_uid, email, role) VALUES (?, ?, ?)",
        [uid, email, "user"]
      );

      user = {
        id: result.insertId,
        firebase_uid: uid,
        email,
        role: "user",
      };
    } else {
      user = rows[0];
    }

    console.log("LOGIN USER:", user);
    res.json(user);

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login gagal" });
  }
};
