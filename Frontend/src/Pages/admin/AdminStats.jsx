import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./AdminStats.css";

const API_URL = "http://localhost:5000/api/admin/stats/sales";

export default function AdminStats() {
  const [rawData, setRawData] = useState([]);
  const [range, setRange] = useState("mingguan");
  // mingguan | bulanan | tahunan

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setRawData(json);
      } catch (err) {
        console.error("Gagal load statistik:", err);
      }
    };
    fetchData();
  }, []);

  /* ================= HELPER ================= */
  const getWeekOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return Math.ceil((date.getDate() + firstDay.getDay()) / 7);
  };

  /* ================= DATA TRANSFORM ================= */
  const chartData = useMemo(() => {
    if (!rawData.length) return [];

    /* ===== MINGGUAN (SENIN – MINGGU) ===== */
    if (range === "mingguan") {
      const days = [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
        "Minggu",
      ];

      // default 0
      const map = {};
      days.forEach((d) => {
        map[d] = { label: d, total: 0 };
      });

      rawData.forEach((item) => {
        const date = new Date(item.tanggal);
        const hari = date.toLocaleDateString("id-ID", {
          weekday: "long",
        });

        if (map[hari]) {
          map[hari].total += Number(item.total_terjual);
        }
      });

      return days.map((d) => map[d]);
    }

    /* ===== BULANAN (MINGGU 1–4) ===== */
    if (range === "bulanan") {
      const weeks = ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"];
      const map = {};

      weeks.forEach((w) => {
        map[w] = { label: w, total: 0 };
      });

      rawData.forEach((item) => {
        const date = new Date(item.tanggal);
        const week = getWeekOfMonth(date);
        const key = `Minggu ${week}`;

        if (map[key]) {
          map[key].total += Number(item.total_terjual);
        }
      });

      return weeks.map((w) => map[w]);
    }

    /* ===== TAHUNAN (JANUARI–DESEMBER) ===== */
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const map = {};
    months.forEach((m) => {
      map[m] = { label: m, total: 0 };
    });

    rawData.forEach((item) => {
      const date = new Date(item.tanggal);
      const bulan = date.toLocaleDateString("id-ID", {
        month: "long",
      });

      if (map[bulan]) {
        map[bulan].total += Number(item.total_terjual);
      }
    });

    return months.map((m) => map[m]);
  }, [rawData, range]);

  /* ================= SUMMARY ================= */
  const totalTerjual = rawData.reduce(
    (sum, item) => sum + Number(item.total_terjual),
    0
  );

  /* ================= RENDER ================= */
  return (
    <div className="admin-page">
      <h1>Statistik Penjualan</h1>

      {/* ===== SUMMARY ===== */}
      <div className="admin-summary">
        <div className="summary-card">
          <h3>Total Produk Terjual</h3>
          <p>{totalTerjual}</p>
        </div>
      </div>

      {/* ===== FILTER ===== */}
      <div className="chart-toggle">
        <button
          className={range === "mingguan" ? "active" : ""}
          onClick={() => setRange("mingguan")}
        >
          Mingguan
        </button>

        <button
          className={range === "bulanan" ? "active" : ""}
          onClick={() => setRange("bulanan")}
        >
          Bulanan
        </button>

        <button
          className={range === "tahunan" ? "active" : ""}
          onClick={() => setRange("tahunan")}
        >
          Tahunan
        </button>
      </div>

      {/* ===== LINE CHART ===== */}
      <div className="chart-card">
        <h3>📈 Tren Penjualan</h3>

        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
