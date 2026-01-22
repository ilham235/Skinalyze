import { Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => navigate("/admin")}>Dashboard</li>
          <li onClick={() => navigate("/admin/produk")}>Produk</li>
          <li onClick={() => navigate("/admin/stats")}>Statistik</li>
          <li
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </li>
        </ul>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
