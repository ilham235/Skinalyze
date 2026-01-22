import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import multer from "multer";
import mysql from "mysql2";
import adminProductRoutes from "./src/routes/adminProductRoutes.js";
import adminStatsRoutes from "./src/routes/adminStatsRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

/* ================= INIT ================= */
dotenv.config();
const app = express();
const PORT = 5000;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

/* ================= UPLOADS ================= */
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
app.use("/uploads", express.static("uploads"));
const upload = multer({ dest: "uploads/" });

/* ================= DATABASE ================= */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "skinalyze",
});

db.connect((err) => {
  if (err) console.error("❌ DB Error:", err.message);
  else console.log("✅ MySQL Connected");
});

/* ================= GEMINI ================= */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ================= ADMIN ROUTES ================= */
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/stats", adminStatsRoutes);

/* ================= ANALYZE SKIN ================= */
/* ================= ANALYZE SKIN (DENGAN VISI/GAMBAR) ================= */
app.post("/api/analyze-skin", upload.single("image"), async (req, res) => {
  console.log("⏳ Mulai analisis...");

  try {
    const { jenisKulit, masalahKulit, budget } = req.body;

    // 1. Validasi File
    if (!req.file) {
      return res.status(400).json({ message: "Foto wajah wajib diunggah" });
    }

    // 2. Konversi File Gambar ke Format Gemini (Base64)
    // Kita baca file yang baru saja diupload oleh multer
    const imagePath = req.file.path;
    const mimeType = req.file.mimetype;
    const imageBuffer = fs.readFileSync(imagePath); // Membaca file jadi buffer

    const imagePart = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: mimeType,
      },
    };

    // 3. Prompt (Instruksi ke AI)
    const prompt = `
    Bertindaklah sebagai ahli dermatologi AI. Analisis gambar wajah yang dilampirkan ini.
    
    Konteks Pengguna:
    - Jenis kulit (klaim user): ${jenisKulit}
    - Masalah utama (keluhan user): ${masalahKulit}
    - Budget: ${budget}

    Tugas:
    1. Validasi visual: Apakah gambar menunjukkan masalah kulit yang disebutkan? Apa lagi yang terlihat (kemerahan, pori besar, dll)?
    2. Berikan saran rutinitas skincare singkat.
    3. Sebutkan kandungan aktif (ingredients) yang cocok.
    
    PENTING: Gunakan Bahasa Indonesia yang ramah. Jangan berikan diagnosis medis serius (kanker, dll), sarankan ke dokter jika parah.
    `;

    // 4. Pilih Model yang Mendukung Gambar (Vision)
    // Pastikan SDK Anda sudah versi terbaru (@google/generative-ai@0.24.1)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    console.log("🧠 Mengirim gambar & prompt ke Gemini...");

    // 5. Kirim Array [Prompt Teks, Data Gambar]
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const aiText = response.text();

    console.log("✅ Gemini selesai");

    /* ================= BAGIAN DATABASE TETAP SAMA ================= */
    let maxBudget = 100000;
    if (budget === "100000") maxBudget = 200000;
    if (budget === "200000") maxBudget = 500000;
    if (budget === "500000") maxBudget = 1000000;

    const [produk] = await db.promise().query(
      `SELECT nama_produk, kategori, harga 
       FROM produk 
       WHERE masalah_kulit = ? AND harga <= ?`,
      [masalahKulit, maxBudget]
    );

    await db.promise().query(
      `INSERT INTO history 
      (user_uid, image_path, jenis_kulit, masalah_kulit, analisis_visual, rekomendasi_produk)
      VALUES (?, ?, ?, ?, ?, ?)`,
      ["guest", req.file.path, jenisKulit, masalahKulit, aiText, JSON.stringify(produk)]
    );

    res.json({
      ai_result: aiText,
      produk,
    });

  } catch (err) {
    console.error("❌ ANALISIS ERROR:", err); // Log error lengkap objectnya

    // Handle error spesifik Gemini
    let errorMessage = "Gagal analisis AI";
    
    if (err.message.includes("404") && err.message.includes("models/")) {
        errorMessage = "Model AI tidak ditemukan. Cek versi SDK atau API Key.";
    } else if (err.message.includes("SAFETY")) {
        errorMessage = "Gambar ditolak oleh filter keamanan AI (nsfw/sensitif).";
    }

    res.status(500).json({ message: errorMessage });
  }
});
app.use("/api/auth", authRoutes);

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log("GEMINI KEY:", process.env.GEMINI_API_KEY ? "ADA" : "TIDAK ADA");
});
