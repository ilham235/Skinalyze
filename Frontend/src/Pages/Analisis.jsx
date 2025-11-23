  import React, { useState, useEffect, useRef } from "react";
  import "./Analisis.css";
  import { useNavigate } from "react-router-dom";

  function Analisis() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const navigate = useNavigate();

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    // ✅ Tutup sidebar saat klik di luar area
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

    // --- Form states ---
    const [jenisKulit, setJenisKulit] = useState("");
    const [masalahKulit, setMasalahKulit] = useState("");
    const [budget, setBudget] = useState("");

    return (
      <div className="analisis-container">
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

        </nav>

        {/* ✅ MAIN CONTENT (tetap dari kamu) */}
        <main className="analisis-main">
          <div className="upload-section">
            <h2 className="section-title">Unggah / Scan Wajah Anda</h2>
            <div className="upload-box">
              <button className="upload-icon">
                  <img src="/upload.png" alt="Upload"className="icon-image"/>
              </button>
              <button className="maximize-icon">⛶</button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Jenis Kulit</label>
            <select
              className="form-select"
              value={jenisKulit}
              onChange={(e) => setJenisKulit(e.target.value)}
            >
              <option value="">Pilih jenis kulit</option>
              <option value="normal">Normal</option>
              <option value="kering">Kering</option>
              <option value="berminyak">Berminyak</option>
              <option value="kombinasi">Kombinasi</option>
              <option value="sensitif">Sensitif</option>
            </select>
          </div>
  <div className="karakter">
          <img src="/Orang1.png" alt="karakter" />
      </div>
          <div className="form-group">
            <label className="form-label">Masalah Kulit</label>
            <select
              className="form-select"
              value={masalahKulit}
              onChange={(e) => setMasalahKulit(e.target.value)}
            >
              <option value="">Pilih masalah kulit</option>
              <option value="jerawat">Jerawat</option>
              <option value="bekas_jerawat">Bekas Jerawat</option>
              <option value="flek_hitam">Flek Hitam</option>
              <option value="kusam">Kusam</option>
              <option value="kerutan">Kerutan</option>
              <option value="pori_besar">Pori-pori Besar</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Budget</label>
            <select
              className="form-select"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="">Pilih budget</option>
              <option value="50-100">Rp 50.000 - Rp 100.000</option>
              <option value="100-200">Rp 100.000 - Rp 200.000</option>
              <option value="200-500">Rp 200.000 - Rp 500.000</option>
              <option value="500+">Di atas Rp 500.000</option>
            </select>
          </div>

          <div className="button-container">
            <button 
            className="analyze-button"
            onClick={() => navigate("/HasilAnalisis")}>
              Let's analyze your skin <span className="arrow-icon">→</span>
            </button>
          </div>
        </main>
      </div>  
    );
  }
      <div className="karakter">
          <img src="/Orang1.png" alt="karakter" />
      </div>
  export default Analisis;
