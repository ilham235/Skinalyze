import React, { useState, useRef, useEffect } from "react";
import "./Riwayat.css";
import { useNavigate } from "react-router-dom";

const Riwayat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAnalisis, setShowAnalisis] = useState(true);
  const [showPesanan, setShowPesanan] = useState(false);
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
        !event.target.closest(".menu-toggle")
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

  const pesananItems = ["Sun Screen", "Facial Wash", "Serum"];

  return (
    <div className="riwayat-page">
      {!isSidebarOpen && (
        <div className="menu-toggle" onClick={toggleSidebar}>
          &#9776;
        </div>
      )}

      <div
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      >
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

      <div className="karakter">
                    <img src="/Orang1.png" alt="karakter" />
            </div>

      <main className="riwayat-content">
        <header className="profile-header">
          <div className="avatar-wrap">
            <img src="/orang2.png" alt="Avatar" className="avatar-img" />
          </div>

          <div className="profile-info">
            <h1>Your Name</h1>
            <div className="skin-type">
              Skin Type : Combination Skin · Moderate hydration
            </div>
          </div>
        </header>

        <section className="riwayat-block">
          <button
            className="riwayat-toggle"
            onClick={() => setShowAnalisis((s) => !s)}
            aria-expanded={showAnalisis}
          >
            <span>Riwayat Analisis</span>
            <span className="arrow">{showAnalisis ? "▲" : "▼"}</span>
          </button>

          {showAnalisis && (
            <div className="analisis-box">
              <p className="analisis-placeholder">
                Belum ada riwayat analisis. Lakukan analisis untuk melihat hasil
                di sini.
              </p>
            </div>
          )}
        </section>

        <section className="riwayat-block">
          <button
            className="riwayat-toggle"
            onClick={() => setShowPesanan((s) => !s)}
            aria-expanded={showPesanan}
          >
            <span>Riwayat Pesanan</span>
            <span className="arrow">{showPesanan ? "▲" : "▼"}</span>
          </button>

          {showPesanan && (
            <div className="pesanan-list">
              {pesananItems.map((item) => (
                <div className="pesanan-item" key={item}>
                  <div className="pesanan-left">
                    <span className="bullet">•</span>
                    <span className="pesanan-name">{item}</span>
                  </div>
                  <button
                    className="detail-btn"
                    onClick={() =>
                      alert(`Buka detail produk: ${item}`)
                    }
                  >
                    Detail
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="skinanalyze-footer">
          <div className="contact-item">
            <img src="/email.png" alt="Email" className="contact-icon" />
            <span className="contact-link">skinalyze@gmail.com</span>
          </div>
          <div className="contact-item">
            <img src="/Instagram.png" alt="Instagram" className="contact-icon" />
            <span>@skinalyze_official</span>
          </div>
          <div className="contact-item">
            <img src="/tiktok.png" alt="TikTok" className="contact-icon" />
            <span>@skinalyze_official</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Riwayat;
