import React, { useState, useRef, useEffect } from "react";
import "./Profil.css";
import { useNavigate } from "react-router-dom";

// --- KOMPONEN KECIL UNTUK FORM (JANGAN DIHAPUS) ---
const DetailItem = ({ label, value, isEdit, onChange }) => (
  <div className="detail-item">
    <span className="detail-label">{label}</span>
    <div className="detail-value-box">
      {isEdit ? (
        <input
          className="detail-input"
          value={value || ""}
          onChange={onChange}
        />
      ) : (
        <span className="detail-text">{value || "-"}</span>
      )}
    </div>
  </div>
);

const Profil = () => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  
  // Ambil data user dari localStorage dengan aman
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const uid = user?.firebase_uid;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState({
    nama: user?.nama || "Loading...",
    email: user?.email || "",
    alamat: "",
    ttl: "",
    photo: "/orang2.png",
  });

  // Ambil data dari database saat halaman dibuka
  useEffect(() => {
    if (uid) {
      fetch(`http://localhost:5000/api/profile/${uid}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setProfile({
              nama: data.nama || user?.nama || "",
              email: data.email || user?.email || "",
              alamat: data.alamat || "",
              ttl: data.ttl || "",
              photo: data.photo || "/orang2.png",
            });
          }
        })
        .catch(err => console.error("Gagal ambil profil:", err));
    }
  }, [uid]);

  const handleSimpan = async () => {
    if (!uid) return alert("User ID tidak ditemukan. Silakan login ulang.");
    
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        alert("Profil berhasil disimpan!");
        setIsEdit(false);
      } else {
        alert("Gagal menyimpan ke server.");
      }
    } catch (err) {
      console.error("Error saat simpan:", err);
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Jika user belum login, arahkan ke login atau tampilkan pesan sederhana
  if (!uid) {
    return <div style={{padding: "20px", textAlign: "center"}}>Silakan login terlebih dahulu.</div>;
  }

  return (
    <div className="profile-container">
      {/* Tombol Menu untuk Sidebar */}
      <button className="menu-toggle" onClick={() => setIsSidebarOpen(true)}>☰</button>

      {/* Sidebar (Sederhana) */}
      {isSidebarOpen && (
        <div className="sidebar-overlay">
          <div className="sidebar" ref={sidebarRef}>
            <button onClick={() => setIsSidebarOpen(false)}>Close</button>
            <nav>
              <p onClick={() => navigate("/dashboard")}>Dashboard</p>
              <p onClick={() => navigate("/analisis")}>Analisis</p>
              <p onClick={() => navigate("/history")}>History</p>
            </nav>
          </div>
        </div>
      )}

      <div className="header-section">
        <div 
          className="avatar-placeholder" 
          onClick={() => isEdit && document.getElementById("photoInput").click()}
          style={{ cursor: isEdit ? 'pointer' : 'default' }}
        >
          <img src={profile.photo} className="avatar-img" alt="Profile" />
          {isEdit && <input id="photoInput" type="file" hidden onChange={handlePhotoChange} />}
        </div>

        <div className="info-header">
          <h1>{profile.nama}</h1>
          <span className="skin-type">Skin Type : Analyzed via AI</span>
        </div>
      </div>

      <div className="details-section">
        <DetailItem 
          label="Nama" 
          value={profile.nama} 
          isEdit={isEdit} 
          onChange={(e) => setProfile({ ...profile, nama: e.target.value })} 
        />
        
        <DetailItem label="E-mail" value={profile.email} isEdit={false} />

        <DetailItem 
          label="Alamat" 
          value={profile.alamat} 
          isEdit={isEdit} 
          onChange={(e) => setProfile({ ...profile, alamat: e.target.value })} 
        />

        <DetailItem 
          label="Tempat, Tanggal Lahir" 
          value={profile.ttl} 
          isEdit={isEdit} 
          onChange={(e) => setProfile({ ...profile, ttl: e.target.value })} 
        />
      </div>

      {!isEdit ? (
        <div className="edit-button-container">
          <button className="edit-button" onClick={() => setIsEdit(true)}>Edit Profile</button>
        </div>
      ) : (
        <div className="simpan-button-container" style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
          <button className="simpan-button" onClick={handleSimpan}>Simpan</button>
          <button className="edit-button" style={{backgroundColor: '#ccc'}} onClick={() => setIsEdit(false)}>Batal</button>
        </div>
      )}
    </div>
  );
};

export default Profil;