//handle Calculate 
export const calculateOrderAmount = (orders: any) => {
    if(!orders)return
    const OrderAmount = orders.map((order: any) => order.totalAmount)
    return OrderAmount.reduce((acc: number, cur: number) => {
        return acc + cur
    }, 0)
}