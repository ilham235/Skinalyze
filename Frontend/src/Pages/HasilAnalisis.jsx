import React, { useState, useEffect, useRef, useMemo } from "react";
import "./HasilAnalisis.css";
import { useNavigate, useLocation } from "react-router-dom";
import Markdown from "react-markdown";

function HasilAnalisis() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // AMBIL DATA ANALISIS
  // =========================
  const { image, jenisKulit, masalahKulit, aiResult } = location.state || {};

  // =========================
  // FIX IMAGE (INI KUNCI NYA)
  // =========================
  const fixedImage = useMemo(() => {
    if (!image) return null;

    // kalau sudah base64
    if (image.startsWith("data:image")) {
      return image;
    }

    // kalau base64 tapi tanpa prefix
    if (image.length > 100) {
      return `data:image/jpeg;base64,${image}`;
    }

    // fallback (blob / url)
    return image;
  }, [image]);

  // =========================
  // STYLE BOX OTOMATIS
  // =========================
  const autoHeightBoxStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "15px",
    border: "1px solid #e0e0e0",
    textAlign: "left",
    lineHeight: "1.6",
    fontSize: "15px",
    color: "#333",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    marginBottom: "20px",
  };

  // =========================
  // VALIDASI DATA
  // =========================
  useEffect(() => {
    if (!aiResult) {
      alert("Data analisis tidak ditemukan. Silakan ulangi.");
      navigate("/analisis");
    }
  }, [aiResult, navigate]);

  // =========================
  // HANDLE SIDEBAR
  // =========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains("hasil-menu-toggle")
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!aiResult) return null;

  return (
    <div
      className="hasil-container"
      style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}
    >
      {/* ================= SIDEBAR ================= */}
      <div ref={sidebarRef} className={`hasil-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="hasil-sidebar-logo">Skinalyze</h2>
        <hr className="hasil-sidebar-line" />
        <ul className="hasil-sidebar-menu">
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/profil")}>Profil</li>
          <li onClick={() => navigate("/riwayat")}>Riwayat</li>
        </ul>
        <button className="hasil-logout-btn" onClick={() => navigate("/")}>
          Log Out
        </button>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="hasil-navbar" style={{ flexShrink: 0 }}>
        <div className="hasil-nav-left">
          {!isSidebarOpen && (
            <div className="hasil-menu-toggle" onClick={() => setIsSidebarOpen(true)}>
              &#9776;
            </div>
          )}
          <img src="/orang2.png" className="hasil-logo-girl" alt="Girl Logo" />
          <h1 className="hasil-brand-name">Skinalyze</h1>
          <span className="hasil-brand-tagline">Analyze Your Skin</span>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main
        className="hasil-main"
        style={{ flexGrow: 1, overflowY: "auto", paddingBottom: "200px", paddingTop: "20px" }}
      >
        <h2 className="hasil-title">Hasil Analisis AI</h2>

        {/* FOTO + DATA USER */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          {fixedImage ? (
            <img
              src={fixedImage}
              alt="Wajah User"
              onError={(e) => (e.target.style.display = "none")}
              style={{
                width: "140px",
                height: "140px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "4px solid #ff9a9e",
                boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
              }}
            />
          ) : (
            <p style={{ color: "#999" }}>Foto tidak tersedia</p>
          )}

          <div style={{ marginTop: "15px" }}>
            <span
              style={{
                background: "white",
                padding: "8px 20px",
                borderRadius: "25px",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#555",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              {jenisKulit || "-"} &bull; {masalahKulit || "-"}
            </span>
          </div>
        </div>

        {/* ================= ANALISIS + PERAWATAN ================= */}
        <div className="hasil-section">
          <h3 style={{ color: "#ff6b81", marginBottom: "15px", fontSize: "18px" }}>
            🔍 Analisis & Saran Perawatan
          </h3>

          <div style={autoHeightBoxStyle}>
            <Markdown>
              {`
### 🧠 Analisis Visual
${aiResult.analisis_visual || "Analisis visual belum tersedia."}

---

### ✨ Saran Perawatan
${
  Array.isArray(aiResult.saran_perawatan)
    ? aiResult.saran_perawatan.map((s) => `- ${s}`).join("\n")
    : aiResult.saran_perawatan || "Saran perawatan belum tersedia."
}
`}
            </Markdown>
          </div>
        </div>

        {/* ================= PRODUK ================= */}
        <h3 className="hasil-subtitle" style={{ marginTop: "40px", fontSize: "20px" }}>
          Rekomendasi Produk
        </h3>

        <div className="hasil-produk-list">
          {aiResult.rekomendasi_produk?.length > 0 ? (
            aiResult.rekomendasi_produk.map((p, i) => (
              <div key={i} className="hasil-produk-card">
                <img
                  src={`http://localhost:5000/uploads/${p.gambar}`}
                  alt={p.nama_produk}
                  className="hasil-produk-image"
                  onError={(e) => (e.target.style.display = "none")}
                />

                <div className="hasil-produk-info">
                  <h4>{p.nama_produk}</h4>
                  <p className="hasil-produk-kategori">{p.kategori}</p>
                  <p className="hasil-produk-harga">
                    Rp {Number(p.harga || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#999" }}>Produk tidak tersedia</p>
          )}
        </div>

        <div className="hasil-checkout-container" style={{ marginTop: "40px", marginBottom: "50px" }}>
          <button className="hasil-checkout-button" onClick={() => navigate("/rekomendasi")}>
            Checkout Now <span className="hasil-arrow-icon-circle">→</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default HasilAnalisis;
