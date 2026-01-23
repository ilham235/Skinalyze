import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Analisis.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { getAuth } from "firebase/auth";

function Analisis() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const [cooldown, setCooldown] = useState(false);


  const [scanOpen, setScanOpen] = useState(false);
  const [preview, setPreview] = useState(null); 
  const [showPreview, setShowPreview] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 

  const sidebarRef = useRef(null);
  const videoRef = useRef(null); 
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [jenisKulit, setJenisKulit] = useState("");
  const [masalahKulit, setMasalahKulit] = useState("");
  const [budget, setBudget] = useState("");

  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 9999999
  };

  const boxStyle = {
    position: 'relative', backgroundColor: '#000', padding: '20px', borderRadius: '15px',
    maxWidth: '90%', width: '400px', textAlign: 'center', boxShadow: '0 4px 20px rgba(255,255,255,0.2)'
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && !e.target.classList.contains("menu-toggle")) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let stream = null;
    const startCamera = async () => {
      await new Promise(r => setTimeout(r, 100));
      if (scanOpen && videoRef.current) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play().catch(e => console.error("Play error:", e));
            };
          }
        } catch (err) {
          alert("Gagal mengakses kamera.");
          setScanOpen(false); 
        }
      }
    };
    if (scanOpen) startCamera();
    return () => { if (stream) stream.getTracks().forEach(track => track.stop()); };
  }, [scanOpen]); 

  const handleStartScan = () => setScanOpen(true);

  const capturePhoto = async () => {
    if (!videoRef.current) return;
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    if (!width || !height) return;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg"));
    const url = URL.createObjectURL(blob);

    setPreview(url);
    setScanOpen(false);
    setShowPreview(true);
  };

  const handleFolderClick = () => {
    preview ? setShowPreview(true) : fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    e.target.value = null;
    setShowPreview(true);
  };

  const deletePhoto = () => {
    setPreview(null);
    setShowPreview(false);
  };
  
  useEffect(() => {
  const auth = getAuth();

  const unsubscribe = auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
    setAuthReady(true);
  });

  return () => unsubscribe();
  }, []);

  /* ================= ANALYZE (LOGIKA SAJA) ================= */
const handleAnalyze = async () => {
  if (!authReady) return;

  if (!preview) {
    alert("Mohon unggah foto wajah terlebih dahulu!");
    return;
  }

  if (cooldown) {
    alert("Silakan tunggu beberapa menit sebelum analisis ulang.");
    return;
  }

  setCooldown(true);
  setTimeout(() => setCooldown(false), 5 * 60 * 1000);

  if (!user) {
    alert("User belum login");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch(preview);
    const blob = await response.blob();
    const file = new File([blob], "wajah.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", file);
    formData.append("jenisKulit", jenisKulit);
    formData.append("masalahKulit", masalahKulit);
    formData.append("budget", budget);
    formData.append("user_uid", user.uid);

    const res = await axios.post(
      "http://localhost:5000/api/analyze-skin",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    navigate("/HasilAnalisis", {
      state: {
        image: preview, // 🔥 INI PENTING
        jenisKulit,
        masalahKulit,
        aiResult: res.data,
      },
    });

  } catch (error) {
    console.error("ANALISIS ERROR:", error);
    alert("Analisis gagal");
  } finally {
    setIsLoading(false);
  }
};



//analisis
  return (
    <div className="analisis-container">
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="sidebar-logo">Skinalyze</h2> <hr className="sidebar-line" />
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/profil")}>Profil</li>
          <li onClick={() => navigate("/riwayat")}>Riwayat</li>
        </ul>
        <button className="logout-btn" onClick={() => navigate("/")}>Log Out</button>
      </div>

      <nav className="navbar">
        <div className="nav-left">
          {!isSidebarOpen && <div className="menu-toggle" onClick={() => setIsSidebarOpen(true)}>&#9776;</div>}
          <img src="/orang2.png" className="logo-girl" alt="Girl Logo" />
          <h1 className="brand-name">Skinalyze</h1>
          <span className="brand-tagline">Analyze Your Skin</span>
        </div>
      </nav>

      <main className="analisis-main">
        <div className="upload-section">
          <h2 className="section-title">Unggah / Scan Wajah Anda</h2>
          <div className="upload-box">
            <button className={`upload-icon ${preview ? "has-file" : ""}`} onClick={handleFolderClick} style={{border: preview ? '2px solid #4CAF50' : ''}}>
              <img src="/upload.png" alt="Upload" className="icon-image" />
            </button>
            <button className="maximize-icon" onClick={handleStartScan}>⛶</button>
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
          </div>
          {preview && <p style={{color:'green', fontSize:'12px', marginTop:'5px'}}>Foto tersimpan</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Jenis Kulit</label>
          <select className="form-select" value={jenisKulit} onChange={(e) => setJenisKulit(e.target.value)}>
            <option value="">Pilih jenis kulit</option>
            <option value="normal">Normal</option>
            <option value="kering">Kering</option>
            <option value="berminyak">Berminyak</option>
            <option value="kombinasi">Kombinasi</option>
            <option value="sensitif">Sensitif</option>
          </select>
        </div>
        
        <div className="karakter"><img src="/Orang1.png" alt="karakter" /></div>

        <div className="form-group">
          <label className="form-label">Masalah Kulit</label>
          <select className="form-select" value={masalahKulit} onChange={(e) => setMasalahKulit(e.target.value)}>
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
          <select className="form-select" value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">Pilih budget</option>
            <option value="50000">Rp 50.000 - Rp 100.000</option>
            <option value="100000">Rp 100.000 - Rp 200.000</option>
            <option value="200000">Rp 200.000 - Rp 500.000</option>
            <option value="500000">Di atas Rp 500.000</option>
          </select>
        </div>

        <div className="button-container">
          <button 
            className="analyze-button" 
            onClick={handleAnalyze} 
            disabled={isLoading } 
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px' // Memberi jarak antara spinner dan teks
            }}
          >
            {isLoading ? (
              <>
                {/* Spinner Mini */}
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Sedang Menganalisis...
              </>
            ) : (
              <>
                Let's analyze your skin <span className="arrow-icon">→</span>
              </>
            )}
          </button>

          {/* Keyframe Animasi (Sisipkan ini di bawah button atau di file CSS) */}
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </main>

      {scanOpen && createPortal(
        <div style={overlayStyle}>
          <div style={boxStyle}>
            <video ref={videoRef} autoPlay playsInline muted onClick={capturePhoto} style={{width: '100%', borderRadius: '10px', display: 'block'}} />
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px', gap: '20px'}}>
               <button onClick={() => setScanOpen(false)} style={{color:'white', background:'none', border:'none'}}>Batal</button>
               <button onClick={capturePhoto} style={{width:'50px', height:'50px', borderRadius:'50%', background:'red', border:'3px solid white'}}></button>
            </div>
          </div>
        </div>, document.body
      )}

      {showPreview && preview && createPortal(
        <div style={overlayStyle} onClick={() => setShowPreview(false)}>
          <div style={{...boxStyle, backgroundColor: '#fff', color: '#333'}} onClick={(e) => e.stopPropagation()}>
            <img src={preview} alt="Hasil" style={{maxWidth: '100%', borderRadius: '10px'}} />
            <button onClick={deletePhoto} style={{marginTop:'10px', padding:'10px', background:'#ff4d4d', color:'white', border:'none', borderRadius:'5px'}}>Ganti Foto</button>
          </div>
        </div>, document.body
      )}
    </div>
  );
}

export default Analisis;