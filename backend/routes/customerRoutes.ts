import { Router } from "express";
import { createCustomer, customerStats, editCustomer, findCustomer, getCustomer, getCustomers } from '../controllers/customerController.js'
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router()


//Create Customers
router.post("/create-customer", checkAuth, createCustomer)


//All customers
router.get("/", checkAuth, getCustomers)

//Get Customer Stats
router.get('/customer-stats', checkAuth, customerStats)

//Find Customer
router.get('/find-customer', checkAuth, findCustomer)


//Get Customer
router.get('/:customerID', checkAuth, getCustomer)


//Edit Customer
router.patch('/edit-customer/:customerID', checkAuth, editCustomer)




export default router