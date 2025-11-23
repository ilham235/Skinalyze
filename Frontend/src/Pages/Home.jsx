import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom"; // ✅ tambahan

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate(); // ✅ tambahan
  const handleEducationClick = () => {
    navigate("/edukasi");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ✅ Tutup sidebar saat klik di luar area sidebar
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

  // ✅ Tambahkan handler untuk pindah ke halaman Analisis
  const handleAnalyzeClick = () => {
    navigate("/analisis"); // nama path harus sama dengan route di App.js
  };

  return (
    <div className="home-container">
      {/* ✅ SIDEBAR */}
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="sidebar-logo">Skinalyze</h2>
        <hr className="sidebar-line" />

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/home")}>
            <img src="home.png" alt="Home" className="menu-icon" />
            <span>Home</span>
          </li>
          <li onClick={() => navigate("/profil")}>
            <img src="profil.png" alt="Profil" className="menu-icon" />
            <span>Profil</span>
          </li>
          <li onClick={() => navigate("/riwayat")}>
            <img src="riwayat.png" alt="Riwayat" className="menu-icon" />
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

        <div className="nav-right">
          <div className="nav-icon">
            <img src="/keranjang.png" alt="Cart" />
            <span>Cart</span>
          </div>
          <div className="nav-icon">
            <img src="/tas.png" alt="Shop" />
            <span>Shop</span>
          </div>
        </div>
      </nav>

      {/* ✅ HERO SECTION */}
      <div className="hero-box">
        <p className="hero-text">
          Skinalyze adalah aplikasi berbasis AI yang membantu kamu memahami kondisi kulit wajah
          dan menemukan produk skincare yang paling cocok. <br /><br />
          Cukup unggah foto wajahmu, biarkan AI menganalisis, dan temukan rekomendasi produk terbaik
          yang bisa langsung kamu beli lewat fitur belanja di aplikasi. <br /><br />
          Dengan Skinalyze, perawatan kulit jadi lebih mudah, personal, dan menyenangkan!
        </p>

        {/* ✅ Tombol analisis langsung pindah ke halaman Analisis */}
        <button className="analyze-btn" onClick={handleAnalyzeClick}>
          Let’s analyze your skin ➜
        </button>
      </div>

      <button className="education-btn" onClick={handleEducationClick}>
        Education for you
      </button>

      {/* ✅ FOOTER */}
      <footer className="skinanalyze-footer">
        <div className="contact-item">
          <img src="/email.png" alt="Email" className="contact-icon" />
          <span className="contact-link">skinalyze@gmail.com</span>
        </div>

        <div className="contact-item">
          <img src="/Instagram.png" alt="Instagram" className="contact-icon" />
          <span>skinalyze_official</span>
        </div>

        <div className="contact-item">
          <img src="/tiktok.png" alt="TikTok" className="contact-icon" />
          <span>skinalyze_official</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
