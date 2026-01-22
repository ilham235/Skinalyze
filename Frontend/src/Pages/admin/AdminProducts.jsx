import { useEffect, useState } from "react";
import "./AdminProduk.css";

const API_URL = "http://localhost:5000/api/admin/products";

const KATEGORI = [
  "Facial Wash",
  "Toner",
  "Serum",
  "Sunscreen",
  "Moisturizer",
];

const MASALAH = [
  "Kulit Berminyak",
  "Kulit Kering",
  "Kulit Sensitif",
  "Jerawat",
  "Bekas Jerawat",
  "Flek Hitam",
  "Kusam",
  "Kerutan",
  "Pori-Pori Besar",
];

export default function AdminProduk() {
  /* ================= STATE ================= */
  const [produk, setProduk] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [gambarBaru, setGambarBaru] = useState(null);
  const [preview, setPreview] = useState(null);

  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [filterMasalah, setFilterMasalah] = useState("");

  /* ================= TAMBAH FORM ================= */
  const [newForm, setNewForm] = useState({
    nama_produk: "",
    kategori: "",
    masalah_kulit: [],
    harga: "",
    stok: "",
  });
  const [newImage, setNewImage] = useState(null);

  /* ================= FETCH ================= */
  const fetchProduk = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProduk(data);
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  /* ================= FILTER ================= */
  const filteredProduk = produk.filter((p) => {
    const matchNama = p.nama_produk
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchKategori = filterKategori
      ? p.kategori === filterKategori
      : true;

    const matchMasalah = filterMasalah
      ? p.masalah_kulit.includes(filterMasalah)
      : true;

    return matchNama && matchKategori && matchMasalah;
  });

  /* ================= TAMBAH ================= */
  const toggleNewMasalah = (item) => {
    setNewForm((prev) => ({
      ...prev,
      masalah_kulit: prev.masalah_kulit.includes(item)
        ? prev.masalah_kulit.filter((m) => m !== item)
        : [...prev.masalah_kulit, item],
    }));
  };

  const addProduk = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(newForm).forEach(([k, v]) => {
      if (Array.isArray(v)) fd.append(k, v.join(", "));
      else fd.append(k, v);
    });
    if (newImage) fd.append("gambar", newImage);

    await fetch(API_URL, { method: "POST", body: fd });
    setNewForm({
      nama_produk: "",
      kategori: "",
      masalah_kulit: [],
      harga: "",
      stok: "",
    });
    setNewImage(null);
    fetchProduk();
  };

  /* ================= EDIT ================= */
  const startEdit = (p) => {
    setEditId(p.produk_id);
    setForm({
      ...p,
      masalah_kulit: p.masalah_kulit.split(",").map((m) => m.trim()),
    });
    setPreview(`${API_URL.replace("/api/admin/products", "")}/uploads/${p.gambar}`);
    setGambarBaru(null);
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({});
    setPreview(null);
    setGambarBaru(null);
  };

  const toggleMasalah = (item) => {
    setForm((prev) => ({
      ...prev,
      masalah_kulit: prev.masalah_kulit.includes(item)
        ? prev.masalah_kulit.filter((m) => m !== item)
        : [...prev.masalah_kulit, item],
    }));
  };

  const saveEdit = async () => {
    const fd = new FormData();
    fd.append("nama_produk", form.nama_produk);
    fd.append("kategori", form.kategori);
    fd.append("harga", form.harga);
    fd.append("stok", form.stok);
    fd.append("masalah_kulit", form.masalah_kulit.join(", "));
    if (gambarBaru) fd.append("gambar", gambarBaru);

    await fetch(`${API_URL}/${editId}`, { method: "PUT", body: fd });
    cancelEdit();
    fetchProduk();
  };

  /* ================= DELETE ================= */
  const deleteProduk = async (id) => {
    if (!window.confirm("Hapus produk ini?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProduk();
  };

  /* ================= RENDER ================= */
  return (
    <div className="admin-page">
      <h1>Kelola Produk</h1>

      {/* ================= TAMBAH PRODUK ================= */}
      <form className="produk-card" onSubmit={addProduk}>
        <h3>Tambah Produk</h3>

        <input
          placeholder="Nama Produk"
          value={newForm.nama_produk}
          onChange={(e) =>
            setNewForm({ ...newForm, nama_produk: e.target.value })
          }
          required
        />

        <select
          value={newForm.kategori}
          onChange={(e) =>
            setNewForm({ ...newForm, kategori: e.target.value })
          }
          required
        >
          <option value="">Pilih Kategori</option>
          {KATEGORI.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>

        <div className="masalah-checkbox">
          {MASALAH.map((m) => (
            <label key={m}>
              <input
                type="checkbox"
                checked={newForm.masalah_kulit.includes(m)}
                onChange={() => toggleNewMasalah(m)}
              />
              {m}
            </label>
          ))}
        </div>

        <input
          type="number"
          placeholder="Harga"
          value={newForm.harga}
          onChange={(e) =>
            setNewForm({ ...newForm, harga: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Stok"
          value={newForm.stok}
          onChange={(e) =>
            setNewForm({ ...newForm, stok: e.target.value })
          }
          required
        />

        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />

        <button className="btn-primary">Simpan Produk</button>
      </form>

      {/* ================= FILTER ================= */}
      <div className="admin-filter-bar">
        <input
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterKategori}
          onChange={(e) => setFilterKategori(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          {KATEGORI.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>

        <select
          value={filterMasalah}
          onChange={(e) => setFilterMasalah(e.target.value)}
        >
          <option value="">Semua Masalah</option>
          {MASALAH.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Masalah Kulit</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredProduk.map((p) => (
              <tr key={p.produk_id}>
                <td>
                  <img
                    src={
                      editId === p.produk_id && preview
                        ? preview
                        : `http://localhost:5000/uploads/${p.gambar}`
                    }
                    className="img-thumb"
                  />
                  {editId === p.produk_id && (
                    <input
                      type="file"
                      onChange={(e) => {
                        setGambarBaru(e.target.files[0]);
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  )}
                </td>

                <td>
                  {editId === p.produk_id ? (
                    <input
                      value={form.nama_produk}
                      onChange={(e) =>
                        setForm({ ...form, nama_produk: e.target.value })
                      }
                    />
                  ) : (
                    p.nama_produk
                  )}
                </td>

                <td>
                  {editId === p.produk_id ? (
                    <select
                      value={form.kategori}
                      onChange={(e) =>
                        setForm({ ...form, kategori: e.target.value })
                      }
                    >
                      {KATEGORI.map((k) => (
                        <option key={k}>{k}</option>
                      ))}
                    </select>
                  ) : (
                    p.kategori
                  )}
                </td>

                <td className="masalah-cell">
                  {editId === p.produk_id ? (
                    <div className="masalah-checkbox">
                      {MASALAH.map((m) => (
                        <label key={m}>
                          <input
                            type="checkbox"
                            checked={form.masalah_kulit.includes(m)}
                            onChange={() => toggleMasalah(m)}
                          />
                          {m}
                        </label>
                      ))}
                    </div>
                  ) : (
                    p.masalah_kulit
                  )}
                </td>

                <td>
                  {editId === p.produk_id ? (
                    <input
                      type="number"
                      value={form.harga}
                      onChange={(e) =>
                        setForm({ ...form, harga: e.target.value })
                      }
                    />
                  ) : (
                    `Rp ${Number(p.harga).toLocaleString()}`
                  )}
                </td>

                <td>
                  {editId === p.produk_id ? (
                    <input
                      type="number"
                      value={form.stok}
                      onChange={(e) =>
                        setForm({ ...form, stok: e.target.value })
                      }
                    />
                  ) : (
                    p.stok
                  )}
                </td>

                <td>
                  {editId === p.produk_id ? (
                    <>
                      <button onClick={saveEdit}>💾</button>
                      <button onClick={cancelEdit}>✖</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(p)}>✏️</button>
                      <button
                        className="btn-danger"
                        onClick={() => deleteProduk(p.produk_id)}
                      >
                        🗑
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
