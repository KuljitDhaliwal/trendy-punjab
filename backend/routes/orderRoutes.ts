import { Router } from "express";
import { createOrder, getOrder, getOrders } from "../controllers/orderController.js";

const router = Router()



router.get('/', getOrders)

router.post('/create-order/:customerID', createOrder)


router.get('/order/:orderID', getOrder)





export default router