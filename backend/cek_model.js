import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function cekKetersediaanModel() {
  console.log("🔑 Memeriksa Key: " + process.env.GEMINI_API_KEY.substring(0, 10) + "...");
  console.log("📡 Menghubungi Server Google untuk meminta daftar model...");

  try {
    // Kita panggil model sembarang untuk memancing koneksi, 
    // tapi kita tangkap errornya untuk melihat apakah 404 atau 403.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Test ping paling ringan
    const result = await model.generateContent("Hi");
    
    console.log("\n✅ BERHASIL! API KEY VALID.");
    console.log("Model merespon: " + result.response.text());
    console.log("👉 Silakan jalankan server backend Anda sekarang.");

  } catch (error) {
    console.log("\n❌ DIAGNOSA ERROR:");
    
    if (error.message.includes("404") || error.message.includes("not found")) {
        console.log("🔴 STATUS: Project Error / API Belum Aktif.");
        console.log("👉 SOLUSI: Anda WAJIB membuat API Key baru dan memilih 'Create in NEW PROJECT'.");
        console.log("   Jangan pakai project lama di Google AI Studio.");
    } else if (error.message.includes("400") || error.message.includes("API key not valid")) {
        console.log("🔴 STATUS: API Key Salah Copy/Paste.");
        console.log("👉 Cek file .env, pastikan tidak ada spasi di awal/akhir key.");
    } else {
        console.log("🔴 STATUS: Error Koneksi/Lainnya.");
        console.log(error.message);
    }
  }
}

cekKetersediaanModel();