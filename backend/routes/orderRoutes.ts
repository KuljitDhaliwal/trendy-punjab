import { Router } from "express";
import { createOrder, getOrder, getOrders, getOrderStats } from "../controllers/orderController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router()



router.get('/', checkAuth, getOrders)

router.get('/orders-stats', checkAuth, getOrderStats)

router.post('/create-order/:customerID', checkAuth, createOrder)


router.get('/order/:orderID', checkAuth, getOrder)





export default router