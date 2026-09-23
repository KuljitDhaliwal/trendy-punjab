import { Router } from "express";
import { createProduct, getProduct, getProducts, editProduct, deactivateProduct, searchProduct, getProductStats, getProductsStats } from "../controllers/productController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router()

//Create Product
router.post('/create-product', checkAuth, createProduct)

//Get Products
router.get("/", checkAuth,  getProducts)

//Products Stats
router.get('/products-stats', getProductsStats)

router.get("/search-product", checkAuth, searchProduct)


//Delete Product
router.patch('/deactivate-product/:productID', checkAuth,  deactivateProduct)

//Get Product
router.get('/:productID', checkAuth,  getProduct)

//Edit Product
router.patch('/edit-product/:productID', checkAuth,  editProduct)




//Product Stats
router.get('/product-stats/:productID', getProductStats)

export default router