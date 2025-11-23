import React, { useState, useEffect, useRef } from "react";
import "./Rekomendasi.css";
import { useNavigate } from "react-router-dom";

function Rekomendasi() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  const handleSerumClick = () => {
    navigate("/detailproduk");
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
  
        <nav className="hasil-navbar">
          <div className="hasil-nav-left">
            {!isSidebarOpen && (
              <div className="hasil-menu-toggle" onClick={toggleSidebar}>
                &#9776;
              </div>
            
          )}
          <img src="/orang2.png" className="rekomendasi-logo-girl" alt="Girl Logo" />
          <h1 className="rekomendasi-brand-name">Skinalyze</h1>
          <span className="rekomendasi-brand-tagline">Analyze Your Skin</span>
        </div>
      </nav>

      <main className="rekomendasi-main">
        <h2 className="rekomendasi-title">Product Recommendation Based Your Skin:</h2>
        <div className="rekomendasi-box">
          <div className="rekomendasi-category">
            <h3>Toner</h3>
            <img src="/toner.png" alt="Toner" />
            <p>Glowsopy Bundle 3 Pcs Watermelon - Rp129.999</p>
          </div>

          <div className="rekomendasi-category">
            <h3>Moisturizer</h3>
            <img src="/mosturizer.png" alt="Moisturizer" />
            <p>SKINTIFIC MSH Niacinamide Brightening - Rp139.000</p>
          </div>

          <div className="rekomendasi-category" onClick={handleSerumClick} style={{ cursor: "pointer" }}>
            <h3>Serum</h3>
            <img src="/serum.png" alt="Serum" />
            <p>KissKitty Serum Pencerah dan Penghalus - Rp79.900</p>
          </div>

          <div className="rekomendasi-category">
            <h3>Face Wash</h3>
            <img src="/face.png" alt="Face Wash" />
            <p>ACNAWAY Mugwort Facial Wash - Rp68.000</p>
          </div>
        </div>

        <div className="rekomendasi-footer">
          <button className="rekomendasi-more-btn">Other Products ➤</button>
        </div>
      </main>
    </div>
  );
}

export default Rekomendasi;
