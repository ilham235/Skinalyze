import db from "../config/mysql.js";

/* ===============================
   GET PROFILE
================================ */
export const getProfile = async (req, res) => {
  try {
    const { uid } = req.params;

    const [rows] = await db.query(
      "SELECT nama, email, alamat, tanggal_lahir, foto FROM users WHERE uid = ?",
      [uid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   UPDATE PROFILE
================================ */
export const updateProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    const { nama, email, alamat, tanggal_lahir, foto } = req.body;

    await db.query(
      `UPDATE users 
       SET nama=?, email=?, alamat=?, tanggal_lahir=?, foto=?
       WHERE uid=?`,
      [nama, email, alamat, tanggal_lahir, foto, uid]
    );

    res.json({ message: "Profile updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
