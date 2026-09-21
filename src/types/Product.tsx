export type ProductVariantType = {
    size?: string,
    stock?: number
}


export type ProductType = {
    _id: string,
    productName: string,
    productCode: string,
    category: string,
    brand: string,
    color: string,
    price: number,
    variants: ProductVariantType[],
    isActive: boolean
}