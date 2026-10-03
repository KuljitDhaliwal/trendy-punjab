import { Router } from "express";
import { todayStats } from "../controllers/adminController.js";

const router = Router()

router.get('/today-stats', todayStats)

export default router