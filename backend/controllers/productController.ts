import type { Response, Request } from "express";
import Product from "../models/Product.js";


//Create Products
export const createProduct = async (req: Request, res: Response) => {
    try {
        const data = req.body
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ status: 400, message: 'Product data missing!' })
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
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Product create error!' })
    }
}


//Get Prodcuts

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ isActive: true })

        return res.status(200).json({ status: 200, message: 'All products fetched!', products })
    } catch (error) {
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
    } catch (error) {
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
        const value = req.body
        if (!productID) {
            return res.status(400).json({
                status: 400,
                message: "Product ID is required!",
            })
        }
        const product = await Product.findByIdAndUpdate({
            _id: productID,
            isActive: true,
        }, value, {
            returnDocument: "after",
            runValidators: true
        })

        if (!product) {
            return res.status(404).json({ status: 404, message: 'No product found!' })
        }

        return res.status(201).json({ status: 201, message: 'Product details updated!', product })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Edit product error!' })
    }
}

//Delete Product

export const deactivateProduct = async (req: Request, res: Response) => {
    try {
        const productID = req.params.productID
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
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Product deactivate error!' })
    }
}



//Product Search + Pagination

export const searchProduct = async (req: Request, res: Response) => {
    try {
        //Queries
        const search = String(req.query.product || "")
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit
        const isProductCode = search?.slice(0, 2)
        const searchProduct = isProductCode.toUpperCase() === 'P-' ? 'productCode' : 'productName'
        let filter = search ? {
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


    } catch (error) {
        console.error("Product search error:", error)
        return res.status(500).json({ status: 500, message: 'Product search error!' })
    }
}