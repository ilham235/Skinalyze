import React, { useState, useEffect, useRef } from "react";
import "./DetailProduk.css";
import { useNavigate } from "react-router-dom";

function DetailProduk() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Tutup sidebar saat klik di luar area sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains("menu-toggle")
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="detailproduk-container">
      {/* ✅ SIDEBAR */}
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="sidebar-logo">Skinalyze</h2>
        <hr className="sidebar-line" />

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/home")}>
            <img src="/home.png" alt="Home" className="menu-icon" />
            <span>Home</span>
          </li>
          <li onClick={() => navigate("/profil")}>
            <img src="/profil.png" alt="Profil" className="menu-icon" />
            <span>Profil</span>
          </li>
          <li onClick={() => navigate("/riwayat")}>
            <img src="/riwayat.png" alt="Riwayat" className="menu-icon" />
            <span>Riwayat</span>
          </li>
        </ul>

        <button className="logout-btn" onClick={() => navigate("/")}>
          <i className="fa fa-sign-out"></i> Log Out
        </button>
      </div>

      {/* ✅ NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          {!isSidebarOpen && (
            <div className="menu-toggle" onClick={toggleSidebar}>
              &#9776;
            </div>
          )}

          <img src="/orang2.png" className="logo-girl" alt="Girl Logo" />
          <h1 className="brand-name">Skinalyze</h1>
          <span className="brand-tagline">Analyze Your Skin</span>
        </div>
      </nav>

      {/* ✅ DETAIL PRODUK SECTION */}
      <div className="detailproduk-box">
        <img
          src="/serum.png"
          alt="Serum Detail"
          className="detailproduk-image"
        />
        <div className="detailproduk-info">
          <h2>KissKitty Serum Pencerah dan Penghalus Wajah</h2>
          <p>
            Serum dengan formula ringan yang membantu mencerahkan kulit,
            mengurangi noda hitam, dan menjaga kelembapan kulitmu.
          </p>
          <p>
            <strong>Harga:</strong> Rp 79.900
          </p>
          <div className="button-group">
            <button
              className="detailproduk-back-btn"
              onClick={() => navigate("/rekomendasi")}
            >
              Kembali
            </button>
            <button className="detailproduk-buy-btn">Checkout Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduk;
