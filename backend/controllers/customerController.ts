import type { Request, Response } from "express"
import Customer from "../models/Customer.js"

export const createCustomer = async (req: Request, res: Response) => {
  try {
    console.log("1. Controller reached")
    console.log("2. Body:", req.body)

    const customer = await Customer.create(req.body)

    console.log("3. Customer created:", customer)

    res.status(201).json(customer)
  } catch (error) {
    console.error("4. Error:", error)

    res.status(500).json({
      message: "Failed to create customer",
    })
  }
}