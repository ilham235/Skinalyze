import React, { useState, useEffect, useRef } from "react";
import "./Rekomendasi.css";
import { useNavigate } from "react-router-dom";

function Rekomendasi() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // ===============================
  // STATE PRODUK (DINAMIS)
  // ===============================
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ===============================
  // FETCH PRODUK DARI BACKEND
  // ===============================
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rekomendasi");
        const data = await res.json();
        setProdukList(data.produk || []);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, []);

  // ===============================
  // SIDEBAR CLICK OUTSIDE
  // ===============================
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

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="hasil-container">
      {/* ================= SIDEBAR ================= */}
      <div
        ref={sidebarRef}
        className={`hasil-sidebar ${isSidebarOpen ? "open" : ""}`}
      >
        <h2 className="hasil-sidebar-logo">Skinalyze</h2>
        <hr className="hasil-sidebar-line" />
        <ul className="hasil-sidebar-menu">
          <li onClick={() => navigate("/home")}>
            <img src="home.png" alt="Home" className="hasil-menu-icon" />
            <span>Home</span>
          </li>
          <li onClick={() => navigate("/profil")}>
            <img src="profil.png" alt="Profil" className="hasil-menu-icon" />
            <span>Profil</span>
          </li>
          <li onClick={() => navigate("/riwayat")}>
            <img src="riwayat.png" alt="Riwayat" className="hasil-menu-icon" />
            <span>Riwayat</span>
          </li>
        </ul>

        <button className="hasil-logout-btn" onClick={() => navigate("/")}>
          Log Out
        </button>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="hasil-navbar">
        <div className="hasil-nav-left">
          {!isSidebarOpen && (
            <div className="hasil-menu-toggle" onClick={toggleSidebar}>
              &#9776;
            </div>
          )}

          <img
            src="/orang2.png"
            className="rekomendasi-logo-girl"
            alt="Girl Logo"
          />
          <h1 className="rekomendasi-brand-name">Skinalyze</h1>
          <span className="rekomendasi-brand-tagline">
            Analyze Your Skin
          </span>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="rekomendasi-main">
        <h2 className="rekomendasi-title">
          Product Recommendation Based Your Skin:
        </h2>

        {/* ================= PRODUK ================= */}
        <div className="rekomendasi-box">
          {loading ? (
            <p>Memuat rekomendasi produk...</p>
          ) : produkList.length === 0 ? (
            <p>Tidak ada produk yang sesuai</p>
          ) : (
            produkList.map((produk) => (
              <div
                key={produk.produk_id}
                className="rekomendasi-category"
                onClick={() =>
                  navigate(`/detailproduk/${produk.produk_id}`)
                }
                style={{ cursor: "pointer" }}
              >
                <h3>{produk.kategori}</h3>

                <img
                  src={`/${produk.gambar}`}
                  alt={produk.nama_produk}
                />

                <p>
                  {produk.nama_produk} – Rp{" "}
                  {produk.harga.toLocaleString("id-ID")}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="rekomendasi-footer">
          <button className="rekomendasi-more-btn">
            Other Products ➤
          </button>
        </div>
      </main>
    </div>
  );
}

export default Rekomendasi;
