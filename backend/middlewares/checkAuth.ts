import type { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) throw new Error('JWT is missing!')

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            console.log("CHECK AUTH RUNNING")
            return res.status(401).json({ status: 401, message: "Authorization token missing!" })
        }

        const token = authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({ status: 401, message: "Invalid authorization format!" })
        }

        const decoded = jwt.verify(token, JWT_SECRET) as {
            adminId: string
        }

        req.adminId = decoded.adminId

        next()

    } catch (error) {
        console.error("CHECK AUTH ERROR:", error)
        return res.status(500).json({ status: 500, message: 'something went wrong!' })
    }
}