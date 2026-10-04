import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    fullname: {
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

    notes: {
        type: String,
        trim: true,
    },
    
    lastVisit: {
        type: Date,
    }
},
    {
        timestamps: true,
    }
)


customerSchema.virtual("orders", {
    ref: "Order",
    localField: "_id",
    foreignField: "customerId"
})

customerSchema.set("toJSON", {
    virtuals: true
})

customerSchema.set("toObject", {
  virtuals: true,
});


const Customer = mongoose.model("Customer", customerSchema)

export default Customer