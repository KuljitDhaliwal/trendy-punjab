export type ProductVariantType = {
    size?: string,
    stock?: number,
    color?: string
}


export type ProductType = {
    _id: string,
    productName: string,
    productCode: string,
    category: string,
    brand: string,
    price: number,
    variants: ProductVariantType[],
    isActive: boolean
}