import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:uid", getProfile);
router.put("/:uid", updateProfile);

export default router;
