import { Router } from "express";
import { getAdminInfo, setupProfile, todayStats, updateAdminPassword } from "../controllers/adminController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router()

router.get('/today-stats', todayStats)

router.get('/admin-info', checkAuth, getAdminInfo)



router.patch('/update-password', checkAuth, updateAdminPassword)

router.patch('/update-profile', checkAuth, setupProfile)


export default router