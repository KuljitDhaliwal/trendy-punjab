import type { Request, Response } from "express";
import Customer from "../models/Customer.js";
import Product from "../models/Product.js";

//Create Order
export const createOrder = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const { customerID } = req.params
        const customer = await Customer.findById(customerID)
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ status: 400, message: 'No data!!' })
        }
        if (!customer) {
            return res.status(404).json({ status: 404, message: 'Customer not found!!' })

        }

        if (!data.items || data.items.length === 0) {
            return res.status(404).json({ status: 404, message: 'Item missing!!' })
        }

        const productsId = data.items.map((item: any) => {
            if (item.productId) {
                return item.productId
            }
        })


        const products = await Promise.all(
            productsId.map((id: string) => Product.findById(id))
        )

        for (const product of products) {
            if (!product) {
                return res.status(404).json({
                    status: 404,
                    message: "Product not found!!"
                })
            }
        }



    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Order create error' })
    }
}