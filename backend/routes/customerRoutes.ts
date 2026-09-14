import { Router } from "express";
import { createCustomer } from '../controllers/customerController.js'

const router = Router()

router.post("/", createCustomer)


export default router