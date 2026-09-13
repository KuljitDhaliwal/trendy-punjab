export type TodaySale = {
  id: number
  productName: string
  category: string
  size: string
  quantity: number
  price: number
}

export const TodaySalesData: TodaySale[] = [
  {
    id: 1,
    productName: "Blue Oxford Shirt",
    category: "Shirts",
    size: "M",
    quantity: 1,
    price: 1499,
  },
  {
    id: 2,
    productName: "Black Jeans",
    category: "Jeans",
    size: "32",
    quantity: 2,
    price: 1199,
  },
  {
    id: 3,
    productName: "Classic Jacket",
    category: "Jackets",
    size: "L",
    quantity: 1,
    price: 2999,
  },
  {
    id: 4,
    productName: "White Linen Shirt",
    category: "Shirts",
    size: "XL",
    quantity: 1,
    price: 1299,
  },
]