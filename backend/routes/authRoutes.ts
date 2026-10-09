import { Router } from "express";
import { adminRegister } from "../controllers/adminController.js";
import { adminLogin, logout, refreshToken } from "../controllers/authController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router()


router.post('/register', adminRegister)

router.post('/login', adminLogin)

router.post('/refresh', refreshToken)

router.post('/logout', checkAuth, logout)


export default router