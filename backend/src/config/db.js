const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "skinalyze",
});

db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ DB CONNECT ERROR:", err);
  } else {
    console.log("✅ TERHUBUNG KE DATABASE:", conn.config.database);
    conn.release();
  }
});

export default db;
