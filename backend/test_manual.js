// test_manual.js
// KITA TIDAK PAKAI LIBRARY GOOGLE DI SINI
// Kita pakai fetch bawaan Node.js

const API_KEY = "GAIzaSyADZKjNtFV_szSso4i2csVKPpgcTFGYbyw"; // <--- TEMPEL KEY DI SINI LANGSUNG

async function testRawAPI() {
  console.log("🚀 Mencoba koneksi manual (tanpa SDK)...");
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  
  const payload = {
    contents: [{
      parts: [{ text: "Halo, jawab 'OK' jika kamu mendengar saya." }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.log(`❌ GAGAL! Status: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.log("Pesan Error Asli dari Google:", errorText);
      return;
    }

    const data = await response.json();
    console.log("✅ BERHASIL! API Key Anda SEHAT.");
    console.log("Respon AI:", data.candidates[0].content.parts[0].text);

  } catch (error) {
    console.log("❌ ERROR JARINGAN/SISTEM:");
    console.log(error);
  }
}

testRawAPI();