import { api } from "../../../utils/api"

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