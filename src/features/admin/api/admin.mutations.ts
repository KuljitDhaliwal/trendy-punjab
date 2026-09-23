import { useMutation } from "@tanstack/react-query"
import { createProduct, deactiveProduct, editProduct, editCustomer, findCustomer, getCustomer, getProduct, setCustomer } from "./admin.api"
import type { CustomerFormData } from "../../../pages/Admin/EditCustomer"
import type { AddProductType } from "../../../static/AddProductData"
import type { FormValueType } from "../../../pages/Admin/Products/AddProduct"

export const useCreateCustomer = () => {
    return useMutation({mutationFn: setCustomer})
}


export const useGetCustomer = () => {
    return useMutation({mutationFn: getCustomer})
}

export const useFindCustomer = () => {
    return useMutation({mutationFn: (search: string) => findCustomer(search)})
}


export const useEditCustomer = () => {
    return useMutation({mutationFn: ({customerID, value}: {customerID: string, value: CustomerFormData}) => editCustomer(customerID, value)})
}



type EditProductType = {
    productID: string,
    value: FormValueType
}




//Prodcuts

//Create Product

export const useCreateProduct = () => {
    return useMutation({mutationFn: createProduct})
}


//Get Product
export const useGetProduct = () => {
    return useMutation({mutationFn: (productID: string) => getProduct(productID)})
}

//Deactive Product
export const useDeactivateProduct = () => {
    return useMutation({mutationFn: (productID: string) => deactiveProduct(productID)})
}


//Edit Product
export const useEditProduct = () => {
    return useMutation({mutationFn: ({productID, value}: EditProductType) => editProduct(productID, value)})
}

