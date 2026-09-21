import mongoose from "mongoose"

const productVariantSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            required: true,
            trim: true,
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
    },
    {
        _id: false,
    }
)

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        productCode: {
            type: String,
            required: true,
            unique: true,   
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        brand: {
            type: String,
            trim: true,
        },

        color: {
            type: String,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        variants: {
            type: [productVariantSchema],
            required: true,
            validate: {
                validator: (variants: unknown[]) => variants.length > 0,
                message: "Product must have at least one size",
            },
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema)

export default Product