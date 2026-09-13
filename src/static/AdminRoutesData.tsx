import type { IconType } from "react-icons"
import { LuLayoutDashboard } from "react-icons/lu";
import { HiUsers } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";
import { FaFirstOrder } from "react-icons/fa6";

export type AdminRoutes = {
    name: string,
    route: string,
    icon: IconType
}

export const AdminRoutesData: AdminRoutes[] = [
    {
        name: 'Dashboard',
        route: '',
        icon: LuLayoutDashboard
    },
    {
        name: 'Customers',
        route: 'customers',
        icon: HiUsers
    },
    {
        name: 'Products',
        route: 'products',
        icon: AiFillProduct
    },
    {
        name: 'Orders',
        route: 'orders',
        icon: FaFirstOrder
    }
]