import type { CustomerFormData } from "../../../pages/Admin/EditCustomer"
import type { OrderType } from "../../../pages/Order/CreateOrder"
import type { FormValueType } from "../../../pages/Products/AddProduct"
import type { AdminProfilePasswordType, AdminProfileType } from "../../../types/AdminProfile"
import { api } from "../../../utils/api"
import type { UpdatePasswordType } from "./admin.mutations"



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
    return api(`products/search-product?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, options)
}



//Add product
export const createProduct = (data: FormValueType) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(data)
    }
    return api('products/create-product', options)
}


//Get Product
export const getProduct = (productID: string) => {
    const options = {
        method: 'GET'
    }
    return api(`products/${productID}`, options)
}



//Deactivete Product or Delete Product
export const deactiveProduct = (productID: string) => {
    const options = {
        method: 'PATCH'
    }

    return api(`products/deactivate-product/${productID}`, options)
}



//Get Product Data

export const getProductStats = (productID: string) => {
    const options = {
        method: 'GET'
    }
    return api(`products/product-stats/${productID}`, options)
}


///Edit Product
export const editProduct = (productID: string, value: FormValueType) => {
    const options = {
        method: 'PATCH',
        body: JSON.stringify(value)
    }
    return api(`products/edit-product/${productID}`, options)
}



//Products Stats
export const getProductsStats = () => {
    const options = {
        method: 'GET'
    }
    return api('products/products-stats', options)
}



//Search Single Product
export const getSearchSingleProduct = (search: string) => {
    const options = {
        method: 'GET'
    }
    return api(`products/search-single-product?search=${search}`, options)
}



//Create Order
export const createOrder = (customerID: string, data: OrderType ) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(data)
    }
    return api(`orders/create-order/${customerID}`, options)
}


//Get Order
export const getOrder = (orderID: string) => {
    const options = {
        method: 'GET',
    }
    return api(`orders/order/${orderID}`, options)
}


//Get Orders
export const getOrders = (page: number, limit: number, search: string | number) => {
    
    const options = {
        method: 'GET'
    }

    return api(`orders?page=${page}&limit=${limit || '10'}&search=${search}`, options)
}


//Order Stats
export const getOrderStats = () => {
    const options = {
        method: 'GET'
    }
    return api('orders/orders-stats', options)
}



//Admin Dashboard
export const getTodayStats = () => {
    const options = {
        method: 'GET'
    }
    return api('dashboard/today-stats', options)
}




//Admin Profile Setup
export const updateAdminProfile = (data: AdminProfileType) => {
    const options = {
        method: 'PATCH',
        body: JSON.stringify(data)
    }

    return api('dashboard/update-profile', options)
}

//Admin Profile Setup
export const updateAdminPassword = (data: UpdatePasswordType) => {
    const options = {
        method: 'PATCH',
        body: JSON.stringify(data)
    }

    return api('dashboard/update-password', options)
}

//Get Admin Info
export const getAdminInfo = () => {
    const options = {
        method: 'GET',
    }

    return api('dashboard/admin-info', options)
}



