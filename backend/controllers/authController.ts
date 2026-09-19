import type { Request, Response } from "express"
import Admin from "../models/Admin.js"
import bcrypt from "bcrypt"
import { generateToken, generateRefreshToken, verifyRefreshToken } from "../config/jwt.js"



export const adminLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password",
            })
        }

        const valid = await bcrypt.compare(password, admin.password)

        if (valid) {
            const accesstoken = generateToken(admin._id.toString())
            const refreshToken = generateRefreshToken(admin._id.toString())

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })

            return res.status(200).json({ stats: 200, message: 'Login Successful!', accesstoken })
        } else {
            return res.status(401).json({ stats: 401, message: 'Invalid email or password!' })
        }

    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Login Error!' })
    }
}



export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken
        const JWT_SECRET = process.env.JWT_SECRET

        if (!refreshToken) {
            return res.status(401).json({ status: 401, message: 'Refresh Token Missing!' })
        }

        const decoded = verifyRefreshToken(refreshToken)

        const accessToken = generateToken(decoded.adminId)

        return res.status(200).json({
            status: 200,
            accessToken,
        })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Refresh access token error' })
    }
}

export const logout = async(req: Request, res: Response) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })

        return res.status(200).json({
            status: 200,
            message: 'Logout Successfull!'
        })
    } catch (error) {
        return res.status(500).json({status: 500, message: 'logout error!'})
    }
}