import { useQuery } from "@tanstack/react-query"
import { findCustomer, getAdminInfo, getCustomer, getCustomers, getCustomersStats, getOrder, getOrders, getOrderStats, getProduct, getProducts, getProductsStats, getProductStats, getTodayStats } from "./admin.api"

export const useGetCustomers = (page: number, limit: number = 10) => {
    return useQuery({
        queryKey: ['getCustomers', page, limit], 
        queryFn: ()=> getCustomers(page, limit),
        staleTime: 5 * 60 * 1000,
    })
}


export const useGetCustomer = (customerID: string) => {
    return useQuery({
        queryKey: ['getCustomer', customerID],
        queryFn: ()=> getCustomer(customerID),
        enabled: Boolean(customerID),
        staleTime: 5 * 60 * 1000
    })
}



export const useGetCustomersStats = () => {
    return useQuery({queryKey: ['customerStats'], queryFn: getCustomersStats})
}

export const useFindCustomer = (search: string) => {
    return useQuery({queryKey: ["findCustomer"], queryFn: () => findCustomer(search)})
}



///Products
export const useGetProducts = (page: number, search: string, limit: number) => {
    return useQuery({
        queryKey: ['products',limit, page, search], 
        queryFn: ()=> getProducts(page, search, limit),
        staleTime: 5 * 60 * 1000,
    })
} 


export const useGetProduct = (productID: string) => {
    return useQuery({
        queryKey: ['getProduct', productID],
        queryFn: ()=> getProduct(productID),
        enabled: Boolean(productID),
        staleTime: 5 * 60 * 1000
    })
}


//Get Product Stats
export const useGetProductStats = (productID: string) => {
    return useQuery({queryKey: [productID], queryFn: ()=> getProductStats(productID)})
}


//Get Products Stats
export const useGetProductsStats = () => {
    return useQuery({queryKey: ['stats'], queryFn: getProductsStats})
}

//Get Order
export const useGetOrder = (orderID: string) => {
    return useQuery({queryKey: ['order'], queryFn: ()=> getOrder(orderID)})
}


type OrdersType = {
    page: number,
    limit: number,
    search: string | number
}

//Get Orders
export const useGetOrders = ({page, limit, search}: OrdersType) => {
    return useQuery({
        queryKey: ['getOrders', page, limit, search], 
        queryFn: ()=> getOrders(page, limit, search),
        staleTime: 5 * 60 * 1000
    })
}


//Get Orders Stats
export const useGetOrdersStats = () => {
    return useQuery({queryKey: ['order'], queryFn: ()=> getOrderStats()})
}




//Dashboard

//Today Stats
export const useGetTodayStats = () => {
    return useQuery({queryKey: ['stats'], queryFn: ()=> getTodayStats()})
}

//Get Admin info
export const useGetAdminInfo = () => {
    return useQuery({
        queryKey: ['admin'], 
        queryFn: ()=> getAdminInfo(),
        staleTime: 5 * 60 * 1000,
    })
}