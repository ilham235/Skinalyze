import cors from "cors";
import express from "express";
import analyzeRoute from "./routes/analyzeRoute.js";
import authRoutes from "./routes/authRoutes.js";
import produkRoutes from "./routes/produk.routes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // untuk development Vite
  "http://localhost:3000", // untuk development alternatif
  process.env.FRONTEND_URL || "https://your-netlify-domain.netlify.app", // production Netlify
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api", analyzeRoute);
export default app;
