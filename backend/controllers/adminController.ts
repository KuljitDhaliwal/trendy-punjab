import type { Request, Response } from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt"
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";




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


//Today;s stats

export const todayStats = async(req: Request, res: Response) => {
    console.log('Today', new Date())
    const today = new Date().toLocaleDateString()
    try {
        const orders = await Order.find({})

        //Today Orders
        const todayOrders = orders.filter(order => new Date(order.createdAt).toLocaleDateString() === today)
        const totalAmount = todayOrders.map(order => {
            return order.totalAmount
        })

        //Today Sales
        const todaySales = totalAmount.reduce((acc, cur)=> {
            return acc + cur
        },0)

        //Today Served Customers
        const customersId = todayOrders.map(order => {
            return order.customerId.toString()
        })
        const todayCustomer = [...new Set(customersId)].length
        console.log('Customert', new Set(customersId))

        const stats = [
            {
                label: 'Customers Served',
                value: todayCustomer
            },

            {
                label: 'Order Created',
                value: todayOrders.length
            },

            {
                label: "Today's Sales",
                value: todaySales
            },
        ]

        return res.status(200).json({status: 200, message: 'Today Stats!!', stats})

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failed to get today's stats",
        })
    }
}


