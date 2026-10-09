import type { Order } from "../types/Customer";



export const calculateOrderAmount = (
  orders: Order[] = []
): number => {
  return orders.reduce((acc, order) => {
    return acc + order.totalAmount;
  }, 0);
};
