import React, { useState, useRef, useEffect } from 'react';
import './Profil.css'; 
import { useNavigate } from 'react-router-dom';

const DetailItem = ({ label, value }) => (
    <div className="detail-item">
        <span className="detail-label">{label}</span>
        <div className="detail-value-box">
            {value}
        </div>
    </div>
);

const Profil = () => {
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

    return (
        <div className="profile-container">
{!isSidebarOpen && (
  <div className="menu-toggle" onClick={toggleSidebar}>
    &#9776;
  </div>
)} 

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

            {/* ✅ Bagian Profil (punyamu tidak diubah) */}
            <div className="header-section">
                <div className="avatar-placeholder">
                    <img 
                        src="/orang2.png" 
                        alt="Avatar Profil" 
                        className="avatar-img" 
                    />
                </div> 

                <div className="karakter">
                    <img src="/Orang1.png" alt="karakter" />
                </div>

                <div className="info-header">
                    <h1>Your Name</h1>
                    <span className="skin-type">
                        Skin Type : Combination Skin . Moderate hydration
                    </span>
                </div>
            </div>

            <div className="details-section">
                <DetailItem label="Nama" value=":" />
                <DetailItem label="E-mail" value=":" />
                <DetailItem label="Alamat" value=":" />
                <DetailItem label="Tempat, Tanggal Lahir" value=":" />
            </div>

            <div className="edit-button-container">
                <button className="edit-button">
                    Edit Profile
                </button>
            </div>
            <div className="simpan-button-container">
                <button className="simpan-button">
                    Simpan
                </button>
            </div>
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
};


export default Profil;
