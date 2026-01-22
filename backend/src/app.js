import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import produkRoutes from "./routes/produk.routes.js";
import userRoutes from "./routes/userRoutes.js";
import analyzeRoute from "./routes/analyzeRoute.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api", analyzeRoute);
export default app;
