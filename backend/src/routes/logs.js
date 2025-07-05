import express from "express";
import { getRecentLogs } from "../controllers/logController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect the logs route
router.use(authenticate);

// Get latest 20 logs
router.get("/", getRecentLogs);

export default router;
