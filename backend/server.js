import cors from "cors";
// import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import mysql from "mysql2";

import adminProductRoutes from "./src/routes/adminProductRoutes.js";
import adminStatsRoutes from "./src/routes/adminStatsRoutes.js";
import analyzeRoute from "./src/routes/analyzeRoute.js";
import authRoutes from "./src/routes/authRoutes.js";

/* ================= INIT ================= */
//dotenv.config({ path: "./.env" });
const app = express();
const PORT = 5000;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
//require('dotenv').config({ path: './.env' });
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

/* ================= UPLOADS ================= */
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
app.use("/uploads", express.static("uploads"));

/* ================= DATABASE ================= */
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "skinalyze",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ DB Error:", err.message);
//   } else {
//     console.log("✅ MySQL Connected");
//   }
// });

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/stats", adminStatsRoutes);

/**
 * ANALYZE ROUTE
 * NOTE:
 * - Tidak ada logic AI di sini
 * - Semua AI ada di controller (src/controllers)
 */
app.use("/api", analyzeRoute);

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(
    "OPENAI KEY:",
    process.env.OPENAI_API_KEY ? "ADA" : "TIDAK ADA"
  );
});
