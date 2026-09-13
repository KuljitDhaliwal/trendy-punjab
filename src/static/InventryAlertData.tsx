export type InventoryAlert = {
    id: number
    productName: string
    category: string
    size: string
    stock: number
    alert: "low" | "out"
}

export const InventoryAlertData: InventoryAlert[] = [
    {
        id: 1,
        productName: "Blue Oxford Shirt",
        category: "Shirts",
        size: "M",
        stock: 2,
        alert: "low",
    },
    {
        id: 2,
        productName: "Black Jeans",
        category: "Jeans",
        size: "32",
        stock: 1,
        alert: "low",
    },
    {
        id: 3,
        productName: "Classic Jacket",
        category: "Jackets",
        size: "L",
        stock: 0,
        alert: "out",
    },
    {
        id: 4,
        productName: "White Linen Shirt",
        category: "Shirts",
        size: "XL",
        stock: 3,
        alert: "low",
    },
]