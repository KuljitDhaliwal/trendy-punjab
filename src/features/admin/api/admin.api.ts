import type { CustomerFormData } from "../../../pages/Admin/EditCustomer"
import type { FormValueType } from "../../../pages/Admin/Products/AddProduct"
import type { AddProductType } from "../../../static/AddProductData"
import { api } from "../../../utils/api"



//Customer APIS
export const setCustomer = (data: Record<string, string>) => {
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(data)
    }
    return api('customers/create-customer', options)
}


export const getCustomers = (page: number, limit: number = 10) => {
    const options: RequestInit = {
        method: 'GET'
    }
    return api(`customers?&page=${page}&limit=${limit}`, options)
}


export const getCustomer = (customerID: string) => {
    const options = {
        method: 'GET',
    }
    return api(`customers/${customerID}`, options)
}



export const getCustomersStats = () => {
    const options = {
        method: 'GET'
    }
    return api('customers/customer-stats', options)
}


export const findCustomer = (search: string) => {
    const options = {
        method: 'GET'
    }
    return api(`customers/find-customer?search=${search}`, options)
}


export const editCustomer = (customerID: string, value: CustomerFormData) => {
    const options = { 
        method: 'PATCH',
        body: JSON.stringify(value)
    }
    return api(`customers/edit-customer/${customerID}`, options)
}



//Product API


export const getProducts = (page: number, search: string,  limit: number) => {
    const options = {
        method: 'GET',
    }

    return api(`products/search-product/?page=${page}&limit=${limit}&search=${search}`, options)

}



//Add product

export const createProduct = (data: FormValueType) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(data)
    }
    return api('products/create-product', options)
}