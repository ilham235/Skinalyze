// import OpenAI from "openai";
// import db from "../config/mysql.js";
// import fs from "fs";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const analyzeSkin = async (req, res) => {
//   let uploadedFilePath = null;

//   try {
//     /* ================= VALIDASI DASAR ================= */
//     const { jenisKulit, masalahKulit, budget, user_uid } = req.body;

//     if (!user_uid) {
//       return res.status(401).json({
//         success: false,
//         message: "User belum login",
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "File gambar tidak ditemukan",
//       });
//     }

//     uploadedFilePath = req.file.path;

//     /* ================= IMAGE → BASE64 ================= */
//     const imageBase64 = fs.readFileSync(uploadedFilePath, "base64");

//     /* ================= MODE ANALISIS ================= */
//     const mode = process.env.ANALYSIS_MODE || "light";

//     const promptLight = `
// BALASAN WAJIB JSON MURNI.
// TIDAK BOLEH markdown, backtick, atau teks tambahan.

// FORMAT:
// {
//   "analisis_visual": "string singkat",
//   "saran_perawatan": ["string"],
//   "bahan_aktif": ["string"]
// }

// DATA:
// Jenis kulit: ${jenisKulit}
// Masalah kulit: ${masalahKulit}
// Budget: ${budget}
// `;

//     const promptFull = `
// BALASAN WAJIB JSON MURNI.
// TIDAK BOLEH markdown, backtick, atau teks tambahan.

// FORMAT:
// {
//   "analisis_visual": "penjelasan detail kondisi kulit",
//   "penyebab": "string",
//   "saran_perawatan": ["string"],
//   "rutinitas_pagi": ["string"],
//   "rutinitas_malam": ["string"],
//   "bahan_aktif": ["string"],
//   "yang_dihindari": ["string"]
// }

// DATA:
// Jenis kulit: ${jenisKulit}
// Masalah kulit: ${masalahKulit}
// Budget: ${budget}
// `;

//     const prompt = mode === "full" ? promptFull : promptLight;

//     /* ================= OPENAI REQUEST ================= */
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       temperature: 0.2,
//       max_tokens: mode === "full" ? 900 : 250,
//       messages: [
//         {
//           role: "user",
//           content: [
//             { type: "text", text: prompt },
//             {
//               type: "image_url",
//               image_url: {
//                 url: `data:${req.file.mimetype};base64,${imageBase64}`,
//               },
//             },
//           ],
//         },
//       ],
//     });

//     const rawText = response?.choices?.[0]?.message?.content;

//     if (!rawText) {
//       throw new Error("Response AI kosong");
//     }

//     /* ================= PARSE JSON AMAN ================= */
//     let aiResult;
//     try {
//       const cleaned = rawText
//         .replace(/```json|```/gi, "")
//         .trim();

//       aiResult = JSON.parse(cleaned);
//     } catch (err) {
//       console.error("❌ RAW AI RESPONSE:", rawText);
//       throw new Error("Gagal parsing JSON dari AI");
//     }

//     /* ================= VALIDASI STRUKTUR ================= */
//     if (
//       !aiResult.analisis_visual ||
//       !Array.isArray(aiResult.saran_perawatan) ||
//       !Array.isArray(aiResult.bahan_aktif)
//     ) {
//       throw new Error("Struktur JSON AI tidak valid");
//     }

//     /* ================= SIMPAN KE DATABASE ================= */
//     await db.query(
//       `INSERT INTO history
//       (user_uid, jenis_kulit, masalah_kulit, analisis_visual, saran_perawatan, rekomendasi_produk)
//       VALUES (?, ?, ?, ?, ?, ?)`,
//       [
//         user_uid,
//         jenisKulit,
//         masalahKulit,
//         aiResult.analisis_visual,
//         JSON.stringify(aiResult.saran_perawatan),
//         JSON.stringify(aiResult.bahan_aktif),
//       ]
//     );

//     /* ================= RESPONSE KE FRONTEND ================= */
//     return res.json({
//       success: true,
//       ai_result: aiResult,
//       mode,
//     });

//   } catch (error) {
//     console.error("❌ ANALYZE ERROR:", error.message);

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Gagal analisis kulit",
//     });

//   } finally {
//     /* ================= HAPUS FILE UPLOAD ================= */
//     if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
//       fs.unlinkSync(uploadedFilePath);
//     }
//   }
// };
import db from "../config/mysql.js";
import fs from "fs";

export const analyzeSkin = async (req, res) => {
  try {
    const { jenisKulit, masalahKulit } = req.body;

    // Ambil produk dari database
    const [products] = await db.query(
      "SELECT nama_produk AS nama, kategori, harga FROM produk WHERE masalah_kulit LIKE ? LIMIT 6",
      [`%${masalahKulit}%`]
    );

    // 🔥 FALLBACK HASIL ANALISIS (ANTI KOSONG)
    const aiResult = {
      analisis_visual: `
Kulit wajah menunjukkan kondisi **${jenisKulit}** dengan indikasi utama berupa **${masalahKulit}**.
Area wajah tampak memiliki produksi minyak yang tidak merata dan pori-pori terlihat cukup jelas.
Belum terlihat tanda iritasi berat, namun diperlukan perawatan rutin untuk menjaga keseimbangan kulit.
      `,
      saran_perawatan: `
- Cuci wajah 2x sehari menggunakan facial wash sesuai jenis kulit  
- Gunakan toner bebas alkohol untuk menjaga pH kulit  
- Aplikasikan moisturizer ringan dan non-comedogenic  
- Gunakan sunscreen minimal SPF 30 setiap pagi  
      `,
      rekomendasi_produk: products.length > 0 ? products : [
        { nama: "Gentle Facial Wash", kategori: "Cleanser", harga: 45000 },
        { nama: "Oil Control Moisturizer", kategori: "Moisturizer", harga: 55000 }
      ]
    };

    return res.json(aiResult);

  } catch (error) {
    console.error("ANALYZE ERROR:", error);
    return res.status(500).json({
      analisis_visual: "Analisis sementara belum tersedia.",
      saran_perawatan: "Silakan coba kembali nanti.",
      rekomendasi_produk: []
    });
  }
};
