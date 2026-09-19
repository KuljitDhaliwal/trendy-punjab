import { useQuery } from "@tanstack/react-query"
import { findCustomer, getCustomers, getCustomersStats } from "./admin.api"

export const useGetCustomers = (page: number, limit: number = 10) => {
    return useQuery({queryKey: ['getCustomers', page, limit], queryFn: ()=> getCustomers(page, limit)})
}


export const useGetCustomersStats = () => {
    return useQuery({queryKey: ['customerStats'], queryFn: getCustomersStats})
}

export const useFindCustomer = (search: string) => {
    return useQuery({queryKey: ["findCustomer"], queryFn: () => findCustomer(search)})
}