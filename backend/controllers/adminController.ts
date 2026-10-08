import type { Request, Response } from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt"
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import Product from "../models/Product.js";



//Initial Register Admin
export const adminRegister = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await Admin.create({
            email,
            password: hashedPassword
        })
        res.status(201).json({ status: 201, message: 'Admin Created Successfully!' })
    } catch (error) {
        res.status(500).json({
            message: "Failed to create admin",
        })
    }
}



//Setup Admin Profile

export const setupProfile = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const adminId = req.adminId;
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ status: 400, message: 'Data not found!!' })
        }
        // const hashedPassword = await bcrypt.hash(data.password, 10)
        // console.log('Hasked', hashedPassword)
        // const updateData = {...data, 'password': hashedPassword}
        // console.log('updateData', updateData)
        await Admin.findByIdAndUpdate(
            adminId,
            data
        )

        return res.status(201).json({ status: 201, message: 'Admin profile updated!!' })
    } catch (error) {
        res.status(500).json({
            message: "Failed to create admin",
        })
    }
}


//Change Password
export const updateAdminPassword = async (req: Request, res: Response) => {
    try {
        const adminId = req.adminId

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ status: 404, message: 'Admin not found!!' })
        }
        const data = req.body
        if (Object.keys(data).length <= 0) {
            return res.status(404).json({ status: 404, message: 'Data not found!!' })
        }
        const isValidPassword = await bcrypt.compare(data.currentPassword, admin.password)
        if (!isValidPassword) {
            return res.status(400).json({ status: 400, message: 'Incorrect current password!!' })
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 10)
        await Admin.findByIdAndUpdate(adminId,
            { password: hashedPassword }
        )
        return res.status(201).json({ status: 201, message: 'Password updated!!' })

    } catch (error) {
        res.status(500).json({
            message: "Failed to update password",
        })
    }
}


//Get Admin Information
export const getAdminInfo = async (req: Request, res: Response) => {
    try {
        const adminId = req.adminId
        const admin = await Admin.findById(adminId).select("-password");
        if (!admin) {
            return res.status(404).json({ status: 404, message: 'Admin not found!!' })
        }
        return res.status(200).json({ status: 200, message: 'Admin information received!!', admin: admin })

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch admin info",
        })
    }
}




//Today's stats
export const todayStats = async (req: Request, res: Response) => {
    console.log('Today', new Date())
    const today = new Date().toLocaleDateString()
    try {
        const orders = await Order.find({}).populate("customerId")

        //Today Orders
        const todayOrders = orders.filter(order => new Date(order.createdAt).toLocaleDateString() === today)
        console.log('Today Orders', todayOrders)
        const totalAmount = todayOrders.map(order => {
            return order.totalAmount
        })
        console.log('totalAmount', totalAmount)


        //Today Sales
        const todaySales = totalAmount.reduce((acc, cur) => {
            return acc + cur
        }, 0)
        console.log('todaySales', todaySales)

        //Today Served Customers
        const customersId = todayOrders.map(order => {
            return order.customerId.toString()
        })
        console.log('customersId', customersId)

        const todayCustomer = [...new Set(customersId)].length
        console.log('todayCustomer', todayCustomer)

        //Inventory Alert
        const products = await Product.find({
            variants: {
                $elemMatch: {
                    stock: 0
                }
            },
            isActive: true
        })


        const stats = [
            {
                label: 'Customers Served',
                value: todayCustomer
            },

            {
                label: 'Order Created',
                value: todayOrders
            },

            {
                label: "Today's Sales",
                value: `₹${todaySales}`
            },
            {
                label: 'Inventory Alert',
                value: products
            }
        ]

        return res.status(200).json({ status: 200, message: 'Today Stats!!', stats })

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failed to get today's stats",
        })
    }
}


