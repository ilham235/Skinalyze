import { firestore } from "../config/firebase.js";
import { mysqlDB } from "../config/mysql.js";

export const getRekomendasi = async (req, res) => {
  try {
    const userId = req.query.userId;

    // Ambil data user dari Firestore
    const userRef = firestore.collection("users").doc(userId);
    const snapshot = await userRef.get();
    const userData = snapshot.data();

    // Ambil produk MySQL berdasarkan jenis kulit user
    const [produk] = await mysqlDB.query(
      "SELECT * FROM produk WHERE jenis_kulit = ?",
      [userData.jenis_kulit]
    );

    res.json({
      status: "success",
      user: userData,
      rekomendasi: produk,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
