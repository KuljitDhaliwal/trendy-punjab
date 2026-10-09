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

            const accesstoken = generateToken(admin._id.toString(), admin.tokenVersion)
            const refreshToken = generateRefreshToken(admin._id.toString(), admin.tokenVersion)

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

    } catch {
        return res.status(500).json({ status: 500, message: 'Login Error!' })
    }
}



export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({ status: 401, message: 'Refresh Token Missing!' })
        }


        const decoded = verifyRefreshToken(refreshToken)
        const admin = await Admin.findById(decoded.adminId)

        if (!admin) {
            return res.status(401).json({
                status: 401,
                message: 'Admin not found!'
            })
        }

        if(admin.tokenVersion !== decoded.tokenVersion){
            return res.status(401).json({
                status: 401, 
                message: 'Invalid token!!'
            })
        }
        
        const accessToken = generateToken(decoded.adminId, admin.tokenVersion)


        return res.status(200).json({
            status: 200,
            accessToken,
        })
    } catch {
        return res.status(500).json({ status: 500, message: 'Refresh access token error' })
    }
}

export const logout = async (req: Request, res: Response) => {

    try {
        const adminId = req.adminId

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })

        await Admin.findByIdAndUpdate(adminId, {
            $inc: { tokenVersion: 1 },
        },
            { new: true })

        return res.status(200).json({
            status: 200,
            message: 'Logout Successfull!'
        })
    } catch {
        return res.status(500).json({ status: 500, message: 'logout error!' })
    }

}