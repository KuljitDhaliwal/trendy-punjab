export type OrderItemType = {
  productId?: string,
  productName?: string,
  category?: string,
  size?: string,
  color?: string,
  quantity?: number,
  price?: number,
  total?: number,
}



type CustomerType = {
    createdAt: Date,
    fullname: string,
    phone: string,
    updatedAt: Date,
    __v: number,
    _id: string
}

export type OrderType = {
  orderNumber?: string,
  customerId: CustomerType,
  items: OrderItemType[],
  subtotal?: number,
  discount?: number,
  totalAmount: number,
  paymentMethod?: "Cash" | "UPI",
  paymentStatus?: "Pending" | "Paid" | "Partially Paid" | "Refunded",
  orderStatus?: "Pending" | "Completed" | "Cancelled" | "Returned",
  notes?: string,
  createdAt?: Date,
  updatedAt?: Date,
  _id?: string,
  __v?: number
}