import type { IconType } from "react-icons"
import { LuLayoutDashboard } from "react-icons/lu";
import { HiUsers } from "react-icons/hi2";

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
    }
]