import React, { useState, useEffect, useRef } from "react";
import "./Edukasi.css";
import { useNavigate } from "react-router-dom";

function Edukasi() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Tutup sidebar saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains("edukasi-menu-toggle")
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
    <div className="edukasi-container">
      {/* ✅ SIDEBAR */}
      <div
        ref={sidebarRef}
        className={`edukasi-sidebar ${isSidebarOpen ? "open" : ""}`}
      >
        <h2 className="edukasi-sidebar-logo">Skinalyze</h2>
        <hr className="edukasi-sidebar-line" />
        <ul className="edukasi-sidebar-menu">
          <li onClick={() => navigate("/home")}>
            <img src="home.png" alt="Home" className="edukasi-menu-icon" />
            <span>Home</span>
          </li>
          <li onClick={() => navigate("/profil")}>
            <img src="profil.png" alt="Profil" className="edukasi-menu-icon" />
            <span>Profil</span>
          </li>
          <li onClick={() => navigate("/riwayat")}>
            <img src="riwayat.png" alt="Riwayat" className="edukasi-menu-icon" />
            <span>Riwayat</span>
          </li>
        </ul>

        <button className="edukasi-logout-btn" onClick={() => navigate("/")}>
          <i className="fa fa-sign-out"></i> Log Out
        </button>
      </div>

      {/* ✅ NAVBAR */}
      <nav className="edukasi-navbar">
        <div className="edukasi-nav-left">
          {!isSidebarOpen && (
            <div className="edukasi-menu-toggle" onClick={toggleSidebar}>
              &#9776;
            </div>
          )}

          <img src="/orang2.png" className="edukasi-logo-girl" alt="Girl Logo" />
          <h1 className="edukasi-brand-name">Skinalyze</h1>
          <span className="edukasi-brand-tagline">Analyze Your Skin</span>
        </div>
      </nav>

      {/* ✅ MAIN CONTENT */}
      <main className="edukasi-main">
        <h2 className="edukasi-title">Edukasi Kulit</h2>
        <div className="edukasi-box" contentEditable="true">
          {/* Kamu bisa tulis edukasi, artikel, atau penjelasan di sini */}
          <p>Tulis pengetahuan tentang perawatan kulit di sini...</p>
        </div>
      </main>
    </div>
  );
}

export default Edukasi;
