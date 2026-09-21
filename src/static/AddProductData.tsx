

export type AddProductType = {
  label: string
  name: string
  placeholder?: string
    type?: "text" | "tel" | "email" | "number"
  required?: boolean
  options?: string[]
}



export type ProductVariant = {
  size: string
  stock: number
}

export const addProductData: AddProductType[] = [
  {
    label: "Product Name",
    name: "productName",
    placeholder: "Enter product name",
    type: "text",
    required: true,
  },
  {
    label: "Category",
    name: "category",
    placeholder: "Enter category",
    type: "text",
    required: true,
  },
  {
    label: "Brand",
    name: "brand",
    placeholder: "Enter brand name",
    type: "text",
  },
  {
    label: "Color",
    name: "color",
    placeholder: "Enter color",
    type: "text",
  },
  {
    label: "Price",
    name: "price",
    placeholder: "Enter price",
    type: "number",
    required: true,
  },
]

export const productVariantData: AddProductType[] = [
  {
    label: "Size",
    name: "size",
    placeholder: "Select size",
    options: [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "28",
      "30",
      "32",
      "34",
      "36",
      "38",
      "40",
      "42",
      "44",
      "46",
    ],
  },
  {
    label: "Stock",
    name: "stock",
    placeholder: "Enter stock quantity",
    type: "number",
    required: true,
  },
]

export const initialProductVariant: ProductVariant = {
  size: "",
  stock: 0,
}