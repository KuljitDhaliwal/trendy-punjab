export type Customer = {
    _id: string,
    fullname: string
    phone: string
    email?: string
    address?: string,
    city?: string,
    state?: string,
    pincode?: string,
    shirtSize?: string
    shirtFit?: string,
    tshirtSize?: string,
    jeansSize?: string,
    jeansFit?: string,
    jacketSize?: string
    shoeSize?: string
    notes?: string
    lastVisit?: Date,
    orders?: Order[],
    totalSpent?: number,
    createdAt: Date,
    updatedAt: Date
    __v: number
}



export type OrderItem = {
    productId: string
    productName: string
    quantity: number
    price: number
    total: number
}

export type Order = {
    _id: string
    customerId: string
    items: OrderItem[]
    subtotal: number
    discount: number
    totalAmount: number
    paymentMethod: "Cash" | "UPI" | "Card" | "Other"
    paymentStatus: "Pending" | "Paid" | "Partially Paid" | "Refunded"
    orderStatus: "Pending" | "Completed" | "Cancelled" | "Returned"
    notes: string
    createdAt: Date
    updatedAt: Date
}