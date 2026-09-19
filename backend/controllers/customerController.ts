import type { Request, Response } from "express"
import Customer from "../models/Customer.js"

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body)
    console.log('Customer', customer)
    return res.status(201).json({ status: 201, message: 'Customer details saved!', customer })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create customer",
    })
  }
}


//All Customers
export const getCustomers = async (req: Request, res: Response) => {
  try {

    //Queries
    const page: number = Number(req.query.page) || 1
    const limit: number = Number(req.query.limit) || 10

    const skip = (page - 1) * limit
    let customerQuery = Customer.find({})
    customerQuery = Customer.find({}).skip(skip).limit(limit)

    const [customers, totalCustomers] = await Promise.all([
      customerQuery,
      Customer.countDocuments()
    ])

    const totalPages = Math.ceil(totalCustomers / limit)
    // const customers = await Customer.find({}).skip(skip).limit(limit)
    return res.status(200).json({ stats: 200, message: 'All customers', customers, pagination: {
      currentPage: page,
      limit,
      totalCustomers,
      totalPages
    } })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Failed to get customers' })
  }
}



//Filter Customer by phone number
export const findCustomer = async(req: Request, res: Response) => {
  try {
    //Query
    const search = req.query.search as string
    const filter = search ? {phone: {
      $regex: search,
      $options: "i"
    }} : {}

    const customer = await Customer.find(filter)

    if(!customer){
      return res.status(404).json({status: 404, message: 'Not found!'})
    }

    return res.status(200).json({status: 200, message: 'Customer found', customer})

  } catch (error) {
    return res.status(500).json({status: 500, message: 'Customer finding error!'})
  }
}



//Each Customer 
export const getCustomer = async (req: Request, res: Response) => {
  try {
    const customerID = req.params.customerID
    const customer = await Customer.findById(customerID)
    if (!customer) {
      return res.status(404).json({
        status: 404,
        message: 'Customer not found!'
      })
    }
    return res.status(200).json({ status: 200, message: 'Got Customer details', customer })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Customer details fetch error!' })
  }
}



//Customer Stats
export const customerStats = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find({})
    if(!customers){
      return res.status(404).json({status: 404, message: 'Customers not found!'})
    }
    //Total Customers
    let totalCustomers = customers.length

    //New this Calculate
    const currentMonth = new Date().getMonth()
    let newThisMonth = 0
    customers.map(item => {
      const customerCreatedMonth = new Date(item.createdAt).getMonth()
      if (customerCreatedMonth === currentMonth) {
        newThisMonth += 1
      }
    })

    const customerStats = [
      {
        label: "Total customers",
        value: totalCustomers,
      },
      {
        label: "New this month",
        value: newThisMonth,
      },
    ]

    return res.status(200).json({ status: 200, message: 'Customer stats', customerStats})

  } catch (error) {
    return res.status(500).json({ status: 500, message: error })
  }
}