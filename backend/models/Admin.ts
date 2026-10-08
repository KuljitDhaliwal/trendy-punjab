import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        fullname: {
            type: String,
            trim: true
        },

        role: {
            type: String,
            enum: ['Owner', 'Manager'],
            required: true
        },

        profileImage: {
            type: String,
            default: "",
            trim: true,
        }

    },
    {
        timestamps: true
    }
)

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
