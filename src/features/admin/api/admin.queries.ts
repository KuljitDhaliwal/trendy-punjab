import { useQuery } from "@tanstack/react-query"
import { findCustomer, getCustomers, getCustomersStats, getProducts, getProductsStats, getProductStats } from "./admin.api"

export const useGetCustomers = (page: number, limit: number = 10) => {
    return useQuery({queryKey: ['getCustomers', page, limit], queryFn: ()=> getCustomers(page, limit)})
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


