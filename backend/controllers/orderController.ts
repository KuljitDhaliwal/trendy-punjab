import type { Request, Response } from "express";
import Customer from "../models/Customer.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

//Create Order
export const createOrder = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const { customerID } = req.params

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
            console.log('Product Before', product)
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

        return res.status(201).json({
            status: 201,
            message: "Order created successfully!",
            order
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Order create error' })
    }
}