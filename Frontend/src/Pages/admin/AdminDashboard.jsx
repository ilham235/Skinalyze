import { useEffect, useState } from "react";
import "./Admin.css";

export default function AdminDashboard() {
  const [produk, setProduk] = useState([]);

  /* ================= FETCH ================= */
  const fetchProduk = async () => {
    const res = await fetch("http://localhost:5000/api/admin/products");
    const data = await res.json();
    setProduk(data);
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  /* ================= SUMMARY ================= */
  const totalProduk = produk.length;

  const totalStok = produk.reduce(
    (sum, p) => sum + Number(p.stok),
    0
  );

  const stokRendah = produk.filter((p) => p.stok <= 5).length;

  return (
    <div className="admin-layout">


      {/* ================= CONTENT ================= */}
      <main className="admin-content">
        <div className="admin-page">
          <h1>Dashboard</h1>

          <div className="admin-summary">
            <div className="summary-card">
              <h3>Total Produk</h3>
              <p>{totalProduk}</p>
            </div>

            <div className="summary-card">
              <h3>Total Stok</h3>
              <p>{totalStok}</p>
            </div>

            <div className="summary-card warning">
              <h3>Stok Rendah</h3>
              <p>{stokRendah}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
