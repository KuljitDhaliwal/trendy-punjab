import { useMutation } from "@tanstack/react-query"
import { createProduct, editCustomer, findCustomer, getCustomer, setCustomer } from "./admin.api"
import type { CustomerFormData } from "../../../pages/Admin/EditCustomer"

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






//Prodcuts

//Create Product

export const useCreateProduct = () => {
    return useMutation({mutationFn: createProduct})
}