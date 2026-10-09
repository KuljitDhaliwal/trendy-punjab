import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) throw new Error('JWT is missing!')

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ status: 401, message: "Authorization token missing!" })
        }

        const token = authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({ status: 401, message: "Invalid authorization format!" })
        }

        const decoded = jwt.verify(token, JWT_SECRET) as {
            adminId: string,
            tokenVersion: number
        }

        const admin = await Admin.findById(decoded.adminId)

        if (!admin) {
            return res.status(401).json({
                status: 401,
                message: "Admin not found!"
            })
        }

        if (admin.tokenVersion !== decoded.tokenVersion) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid token!'
            })
        }

        req.adminId = decoded.adminId

        next()

    } catch {
        return res.status(401).json({
            status: 401,
            message: "Invalid or expired token!"
        })
    }
}