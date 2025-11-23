import React, { useState, useEffect, useRef } from "react";
import "./HasilAnalisis.css";
import { useNavigate } from "react-router-dom";

function HasilAnalisis() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="hasil-container">
      {/* ✅ SIDEBAR */}
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
          <i className="fa fa-sign-out"></i> Log Out
        </button>
      </div>

      {/* ✅ NAVBAR */}
      <nav className="hasil-navbar">
        <div className="hasil-nav-left">
          {!isSidebarOpen && (
            <div className="hasil-menu-toggle" onClick={toggleSidebar}>
              &#9776;
            </div>
          )}

          <img src="/orang2.png" className="hasil-logo-girl" alt="Girl Logo" />
          <h1 className="hasil-brand-name">Skinalyze</h1>
          <span className="hasil-brand-tagline">Analyze Your Skin</span>
        </div>
      </nav>

      {/* ✅ MAIN CONTENT */}
      <main className="hasil-main">
        <h2 className="hasil-title">Hasil Analisis</h2>
        <div className="hasil-box">
          {/* Konten hasil analisis di sini */}
        </div>

        <div className="hasil-checkout-container">
          <button
            className="hasil-checkout-button"
            onClick={() => navigate("/rekomendasi")}
          >
            Checkout Now
            <span className="hasil-arrow-icon-circle">→</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default HasilAnalisis;
