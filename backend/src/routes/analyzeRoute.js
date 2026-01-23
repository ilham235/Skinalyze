import express from "express";
import multer from "multer";
import { analyzeSkin } from "../controllers/analyzeController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze-skin", upload.single("image"), analyzeSkin);

export default router;
