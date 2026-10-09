import type { Request, Response } from "express";
import Customer from "../models/Customer.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { checkRequired } from "../utils/checkRequired.js";
import mongoose from "mongoose";

//Create Order
export const createOrder = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const { customerID } = req.params

        if (!mongoose.Types.ObjectId.isValid(String(customerID))) {
            return res.status(400).json({
                status: 400,
                message: "Invalid customer ID"
            })
        }

        if (!customerID || Array.isArray(customerID)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid customer ID!"
            })
        }

        const customer = await Customer.findById(customerID)

        //Check if data exists
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ status: 400, message: 'No data!!' })
        }

        const missingFields = checkRequired(data, Order)

        if (Object.keys(missingFields).length > 0) {
            return res.status(400).json({
                status: 400,
                message: missingFields
            })
        }

        //Check if customer exists
        if (!customer) {
            return res.status(404).json({ status: 404, message: 'Customer not found!!' })
        }

        //check if order contains items or not
        if (!data.items || data.items.length === 0) {
            return res.status(404).json({ status: 404, message: 'Item missing!!' })
        }

        //Getting Project Items ids
        const productsId = data.items.map((item: any) => {
            if (item.productId) {
                return item.productId
            }
        })

        //Getting Products from server
        const products = await Promise.all(
            productsId.map((id: string) => Product.findById(id))
        )

        //Validate products from order
        for (const product of products) {
            if (!product) {
                return res.status(404).json({
                    status: 404,
                    message: "Product not found!!"
                })
            }



            const item = data.items.find(
                (item: any) =>
                    item.productId === product._id.toString()
            )

            if (!item) {
                continue
            }

            const variant = product.variants.find(
                (variant: any) =>
                    variant.size === item.size &&
                    variant.color === item.color
            )

            if (!variant) {
                return res.status(400).json({ status: 400, message: 'Product variant is missing!!' })
            }

            if (variant.stock < item.quantity) {
                return res.status(400).json({ status: 400, message: 'Product quantity is exceeded!!' })
            }

            if(product.price !== item.price){
                return res.status(400).json({status: 400, message: 'Price not matching!!'})
            }


            variant.stock = variant.stock - item.quantity

            await Product.findByIdAndUpdate(product._id, product)
        }

        const orderNumber = `ORD-${Date.now()}`

        const order = await Order.create({
            orderNumber,
            customerId: customerID,
            items: data.items,
            subtotal: data.subtotal,
            discount: data.discount,
            totalAmount: data.totalAmount,
            paymentMethod: data.paymentMethod,
            paymentStatus: data.paymentStatus,
            orderStatus: data.orderStatus,
            notes: data.notes,
        })

        await Customer.findByIdAndUpdate(customerID, {
            lastVisit: new Date()
        })

        return res.status(201).json({
            status: 201,
            message: "Order created successfully!",
            order
        })

    } catch (error: any) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                status: 400,
                message: error.message
            });
        }
        return res.status(500).json({ status: 500, message: 'Order create failed!!' })
    }
}



//Get order
export const getOrder = async (req: Request, res: Response) => {
    try {
        const orderID = req.params.orderID
        if (!mongoose.Types.ObjectId.isValid(String(orderID))) {
            return res.status(400).json({
                status: 400,
                message: "Invalid order ID"
            })
        }
        const order = await Order.findById(orderID)
        if (!order) {
            return res.status(404).json({ status: 404, message: 'Order not found!!' })
        }

        return res.status(200).json({ status: 200, message: 'Order found!!', order })

    } catch {
        return res.status(500).json({ status: 500, message: 'Error in getting order!!' })
    }
}



//Get orders
export const getOrders = async (req: Request, res: Response) => {
    try {
        const search = typeof req.query.search === "string"
            ? req.query.search
            : ""
        const page: number = Number(req.query.page || 1)
        const limit: number = Number(req.query.limit || 10)
        const skip = (page - 1) * limit

        const isPhone: boolean = /^[0-9]/.test(search)
        const query = isPhone ? "phone" : "fullname"
        const customers = search === "" ? [] : await Customer.find({
            [query]: {
                $regex: search,
                $options: "i"
            }
        }).select("_id")

        const customerIds = customers.map(customer => customer._id)
        const searchQuery = search === "" ? {} : { customerId: { $in: customerIds } }
        const [orders, totalOrders] = await Promise.all([
            Order.find(searchQuery).skip(skip).limit(limit).populate("customerId"),
            Order.countDocuments(searchQuery)
        ])


        const pagination = {
            totalPages: Math.ceil(totalOrders / limit),
            limit: limit,
            currentPage: page,
            orders: orders,
            totalOrders: totalOrders
        }

        return res.status(200).json({ status: 200, message: 'Orders found!!', pagination })
    } catch {
        return res.status(500).json({ status: 500, message: 'Error in getting orders!!' })
    }
}



///Order Stats

export const getOrderStats = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({})
        const completed = orders.filter(order => order.paymentStatus === 'Paid')
        const totalAmount = completed.map(order => order.totalAmount)
        const totalSales = totalAmount.reduce((acc, cur) => {
            return acc + cur
        }, 0)
        const stats = [
            {
                label: 'Total Orders',
                value: orders.length
            },
            {
                label: 'Completed',
                value: completed.length
            },
            {
                label: 'Total Sales',
                value: `₹${totalSales}`
            },
        ]


        return res.status(200).json({ status: 200, message: 'Order stats', stats })
    } catch {
        return res.status(500).json({ status: 500, message: 'Error in getting order stats!!' })
    }
}