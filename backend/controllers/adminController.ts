import type { Request, Response } from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt"




export const adminRegister = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await Admin.create({
            email,
            password: hashedPassword
        })
        res.status(201).json({status: 201, message: 'Admin Created Successfully!'})
    } catch (error) {
        res.status(500).json({
            message: "Failed to create admin",
        })
    }
}