import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        trim: true
    },

    address: {
        type: String,
        trim: true,
    },

    city: {
        type: String,
        trim: true,
    },

    state: {
        type: String,
        trim: true,
    },

    pincode: {
        type: String,
        trim: true,
    },

    shirtSize: {
        type: String,
    },

    shirtFit: {
        type: String,
    },

    tshirtSize: {
        type: String,
    },

    jeansSize: {
        type: String,
    },

    jeansFit: {
        type: String,
    },

    jacketSize: {
        type: String,
    },

    shoeSize: {
        type: String,
    },

    quickNotes: {
        type: [String],
        default: [],
    },

    notes: {
        type: String,
        trim: true,
    },
},
    {
        timestamps: true,
    }
)

const Customer = mongoose.model("Customer", customerSchema)

export default Customer