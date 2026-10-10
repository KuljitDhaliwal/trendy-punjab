import { useQuery } from "@tanstack/react-query"
import { findCustomer, getAdminInfo, getCustomers, getCustomersStats, getOrder, getOrders, getOrderStats, getProducts, getProductsStats, getProductStats, getTodayStats } from "./admin.api"

export const useGetCustomers = (page: number, limit: number = 10) => {
    return useQuery({
        queryKey: ['getCustomers', page, limit], 
        queryFn: ()=> getCustomers(page, limit),
        staleTime: 5 * 60 * 1000,
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
    return useQuery({queryKey: ['products',limit, page, search], queryFn: ()=> getProducts(page, search, limit)})
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
    return useQuery({queryKey: ['order', page, limit, search], queryFn: ()=> getOrders(page, limit, search)})
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