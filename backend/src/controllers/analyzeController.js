import { GoogleGenerativeAI } from "@google/generative-ai";
import db from "../config/mysql.js";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeSkin = async (req, res) => {
  try {
    const { jenisKulit, masalahKulit, budget } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Foto wajah wajib diunggah" });
    }

    /* =========================
       KONVERSI FOTO KE BASE64
    ========================== */
    const imageBase64 = fs.readFileSync(req.file.path, {
      encoding: "base64"
    });

    /* =========================
       PROMPT GEMINI (VISION)
    ========================== */
    const prompt = `
Anda adalah asisten dermatologi virtual (bukan dokter).

DATA USER:
- Jenis kulit: ${jenisKulit}
- Masalah kulit: ${masalahKulit}
- Budget perawatan: ${budget}

TUGAS:
1. Analisis kondisi kulit berdasarkan foto wajah
2. Ringkasan kondisi kulit (maks 3 kalimat)
3. Cara penanganan harian (bullet point)
4. Bahan aktif yang direkomendasikan
5. Gunakan bahasa Indonesia yang ramah
6. Hindari diagnosis medis
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro"
    });

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg"
        }
      }
    ]);

    const aiResult = result.response.text();

    /* =========================
       FILTER BUDGET
    ========================== */
    let maxBudget = 100000;
    if (budget === "100-200") maxBudget = 200000;
    if (budget === "200-500") maxBudget = 500000;
    if (budget === "500+") maxBudget = 1000000;

    /* =========================
       AMBIL PRODUK DARI DATABASE
    ========================== */
    const [produk] = await db.query(
      `SELECT nama_produk, kategori, harga 
       FROM produk 
       WHERE masalah_kulit=? AND harga <= ?`,
      [masalahKulit, maxBudget]
    );

    /* =========================
       RESPONSE KE FRONTEND
    ========================== */
    res.json({
      success: true,
      ai_result: aiResult,
      produk
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal analisis AI" });
  }
};
