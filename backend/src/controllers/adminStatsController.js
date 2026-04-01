import db from "../config/mysql.js";

export const getSalesStats = async (req, res) => {
  const { range = "harian" } = req.query;

  try {
    let groupBy = "";
    let selectDate = "";

    if (range === "harian") {
      selectDate = "DATE(o.created_at)";
      groupBy = "DATE(o.created_at)";
    } else if (range === "bulanan") {
      selectDate = "DATE_FORMAT(o.created_at, '%Y-%m')";
      groupBy = "DATE_FORMAT(o.created_at, '%Y-%m')";
    }

    const [rows] = await db.query(`
      SELECT
        ${selectDate} AS tanggal,
        SUM(oi.qty) AS total_terjual,
        SUM(oi.qty * oi.harga) AS subtotal
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.order_id
      WHERE o.status = 'paid'
      GROUP BY ${groupBy}
      ORDER BY ${groupBy} ASC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Gagal mengambil statistik" });
  }
};
