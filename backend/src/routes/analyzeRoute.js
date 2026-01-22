import express from "express";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import db from "../config/mysql.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze-skin", upload.single("image"), async (req, res) => {
  try {
    const { jenisKulit, masalahKulit, budget } = req.body;
    const user_uid = req.body.user_uid || "guest"; // sementara jika belum auth

    if (!req.file) {
      return res.status(400).json({ message: "Foto wajah wajib diunggah" });
    }

    /* ======================
       GEMINI MODEL (FREE)
    ======================= */
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
Anda adalah AI analisis kulit (bukan dokter).

TUGAS:
1. Analisis kondisi kulit wajah dari foto
2. Ringkasan kondisi kulit (1 paragraf)
3. Saran perawatan harian (bullet point)
4. Rekomendasi bahan aktif skincare

DATA USER:
- Jenis kulit: ${jenisKulit}
- Masalah kulit: ${masalahKulit}
- Budget: Rp ${budget}

FORMAT OUTPUT JSON (WAJIB):
{
  "analisis_visual": "...",
  "saran_perawatan": ["...", "..."],
  "bahan_aktif": ["...", "..."]
}
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: req.file.buffer.toString("base64"),
          mimeType: req.file.mimetype
        }
      }
    ]);

    /* ======================
       SAFE JSON PARSE
    ======================= */
    const text = result.response.text();
    const jsonText = text.substring(
      text.indexOf("{"),
      text.lastIndexOf("}") + 1
    );

    const aiResult = JSON.parse(jsonText);

    /* ======================
       SIMPAN KE TABLE history
    ======================= */
    await db.query(
      `INSERT INTO history 
       (user_uid, jenis_kulit, masalah_kulit, analisis_visual, saran_perawatan, rekomendasi_produk)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user_uid,
        jenisKulit,
        masalahKulit,
        aiResult.analisis_visual,
        JSON.stringify(aiResult.saran_perawatan),
        JSON.stringify(aiResult.bahan_aktif)
      ]
    );

    /* ======================
       AMBIL PRODUK
    ======================= */
    const [produk] = await db.query(
      `SELECT nama_produk, kategori, harga 
       FROM produk 
       WHERE masalah_kulit = ? AND harga <= ?`,
      [masalahKulit, Number(budget)]
    );

    res.json({
      success: true,
      ai_result: aiResult,
      produk
    });

  } catch (error) {
    console.error("ERROR ANALISIS:", error.message);
    res.status(500).json({ message: "Gagal analisis kulit (AI)" });
  }
});

export default router;
