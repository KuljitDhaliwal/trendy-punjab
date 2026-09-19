import { Router } from "express";
import { createCustomer, customerStats, findCustomer, getCustomer, getCustomers } from '../controllers/customerController.js'

const router = Router()


//Create Customers
router.post("/create-customer", createCustomer)


//All customers
router.get("/", getCustomers)

//Get Customer Stats
router.get('/customer-stats', customerStats)

//Find Customer
router.get('/find-customer', findCustomer)


//Get Customer
router.get('/:customerID', getCustomer)




export default router