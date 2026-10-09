import type { Response, Request } from "express";
import Product from "../models/Product.js";
import { checkRequired } from "../utils/checkRequired.js";
import mongoose from "mongoose";


//Create Products
export const createProduct = async (req: Request, res: Response) => {
    try {
        const data = req.body
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ status: 400, message: 'Product data missing!' })
        }

        const missingFields = checkRequired(data, Product)

        if (Object.keys(missingFields).length > 0) {
            return res.status(400).json({
                status: 400,
                message: missingFields
            })
        }

        const lastProduct = await Product.findOne().sort({ productCode: -1 })

        let nextNumber = 1

        if (lastProduct) {
            nextNumber = Number(lastProduct.productCode.split("-")[1]) + 1
        }


        const productCode = `P-${String(nextNumber).padStart(4, "0")}`

        const product = await Product.create({
            ...data,
            productCode,
        })


        return res.status(201).json({ status: 201, message: 'Product created!', product })
    } catch (error: any) {
        if (error.name === "ValidationError") {
            const errors: Record<string, string> = {}

            for (const [key, value] of Object.entries(error.errors)) {
                errors[key] = (value as any).message
            }

            return res.status(400).json({
                status: 400,
                message: errors
            })
        }
        return res.status(500).json({ status: 500, message: 'Product create error!' })
    }
}


//Get Prodcuts
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ isActive: true })

        return res.status(200).json({ status: 200, message: 'All products fetched!', products })
    } catch {
        return res.status(500).json({ status: 500, message: 'Products fetch error!' })

    }
}


//Get product
export const getProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const productID = req.params.productID
        if (!mongoose.Types.ObjectId.isValid(String(productID))) {
            return res.status(400).json({
                status: 400,
                message: "Invalid product ID"
            })
        }
        const product = await Product.findById({
            _id: productID,
            isActive: true
        })

        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Product not found!",
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Product found!",
            product,
        })
    } catch {
        return res.status(500).json({
            status: 500,
            message: "Failed to get product!",
        })
    }
}



//Edit Product
export const editProduct = async (req: Request, res: Response) => {
    try {
        const productID = req.params.productID
        if (!mongoose.Types.ObjectId.isValid(String(productID))) {
            return res.status(400).json({
                status: 400,
                message: "Invalid product ID"
            })
        }
        const data = req.body
        const missingFields = checkRequired(data, Product)

        if (Object.keys(missingFields).length > 0) {
            return res.status(400).json({
                status: 400,
                message: missingFields
            })
        }
        if (!productID) {
            return res.status(400).json({
                status: 400,
                message: "Product ID is required!",
            })
        }
        const product = await Product.findByIdAndUpdate({
            _id: productID,
            isActive: true,
        }, data, {
            returnDocument: "after",
            runValidators: true
        })

        if (!product) {
            return res.status(404).json({ status: 404, message: 'No product found!' })
        }

        return res.status(201).json({ status: 201, message: 'Product details updated!', product })
    } catch {
        return res.status(500).json({ status: 500, message: 'Edit product error!' })
    }
}

//Delete Product

export const deactivateProduct = async (req: Request, res: Response) => {
    try {
        const productID = req.params.productID
        if (!mongoose.Types.ObjectId.isValid(String(productID))) {
            return res.status(400).json({
                status: 400,
                message: "Invalid order ID"
            })
        }
        if (!productID) {
            return res.status(400).json({
                status: 400,
                message: "Product ID is required!",
            })
        }
        const product = await Product.findOneAndUpdate({
            _id: productID,
            isActive: true
        }, {
            isActive: false
        },
            {
                returnDocument: "after",
            })

        if (!product) {
            return res.status(404).json({ status: 404, message: 'No product found!' })
        }

        return res.status(200).json({ status: 200, message: 'Product deactivated!', product })
    } catch {
        return res.status(500).json({ status: 500, message: 'Product deactivate error!' })
    }
}



//Product Search + Pagination
export const searchProduct = async (req: Request, res: Response) => {
    try {
        //Queries
        const search = String(req.query.search || "")
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit
        const isProductCode = search?.slice(0, 2)
        const searchProduct = isProductCode.toUpperCase() === 'P-' ? 'productCode' : 'productName'
        const filter = search ? {
            [searchProduct]: {
                $regex: search,
                $options: 'i'
            },
            isActive: true
        } : { isActive: true }

        const [products, totalProducts] = await Promise.all([
            Product.find(filter)
                .skip(skip).limit(limit),
            Product.countDocuments(filter)
        ])

        const totalPages = Math.ceil(totalProducts / limit)

        const pagination = {
            totalPages: totalPages,
            currentPage: page,
            totalProducts: totalProducts,
            limit: limit
        }


        return res.status(200).json({ status: 200, message: 'Product found!', products, pagination })


    } catch {
        return res.status(500).json({ status: 500, message: 'Product search error!' })
    }
}



//Product Stats
export const getProductStats = async (req: Request, res: Response) => {
    try {
        const productID = req.params.productID
        if (!mongoose.Types.ObjectId.isValid(String(productID))) {
            return res.status(400).json({
                status: 400,
                message: "Invalid product ID"
            })
        }

        const product = await Product.findOne({
            _id: productID,
            isActive: true
        })
        if (!product) {
            return res.status(404).json({ status: 404, message: 'Product not found!' })
        }

        let totalStocks = 0
        const totalVariants = product.variants.length
        let outOfStock = 0
        let inStocks = 0
        product.variants.map(variant => {
            totalStocks += variant.stock
            if (variant.stock === 0) {
                outOfStock += 1
            } else {
                inStocks += 1
            }
        })


        const productStats = [
            {
                label: 'totalStocks',
                value: totalStocks
            },
            {
                label: 'totalVariants',
                value: totalVariants
            },
            {
                label: 'outOfStock',
                value: outOfStock
            },
            {
                label: 'inStocks',
                value: inStocks
            },
        ]

        return res.status(200).json({ status: 200, message: 'Product Stats!', productStats })


    } catch {
        return res.status(500).json({ status: 500, message: 'Product details error' })
    }
}





//All Products Stats

export const getProductsStats = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ isActive: true })
        const totalProducts = products.length
        let outOfStock = 0
        let inStocks = 0
        products.map(product => {
            product.variants?.map((variant: any) => {
                if (variant.stock === 0) {
                    outOfStock += 1
                } else {
                    inStocks += 1
                }
            })
        })

        const productsStats = [
            {
                label: 'Total Products',
                value: totalProducts
            },
            {
                label: 'Out of Stocks',
                value: outOfStock
            },
            {
                label: 'In Stocks',
                value: inStocks
            },
        ]
        return res.status(200).json({ status: 200, message: 'Products stats', productsStats })
    } catch {
        return res.status(500).json({ status: 500, message: 'Products Stats error' })

    }
}



//Search Single Product
export const searchSingleProduct = async (req: Request, res: Response) => {
    try {
        const search: string = String(req.query.search)
        const isValid = search?.slice(0, 2).toUpperCase() === 'P-'
        const searchProduct = isValid ? 'productCode' : 'productName'
        const product = await Product.find({
            [searchProduct]: {
                $regex: search,
                $options: 'i'
            },
            isActive: true
        })

        if (!product) {
            return res.status(404).json({ status: 404, message: 'Product not found!' })
        }

        return res.status(200).json({ status: 200, message: 'Product found!', product })

    } catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message })
    }
}