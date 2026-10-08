import type { IconType } from "react-icons"
import { LuLayoutDashboard } from "react-icons/lu";
import { HiUsers } from "react-icons/hi2";
import { MdBorderAll } from "react-icons/md";
import { FaCartPlus, FaKey, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";


type SubRoute = {
  name: string
  route: string
  icon: IconType
}

export type AdminRoutes = {
    name: string,
    route: string,
    icon: IconType,
    subRoutes?: SubRoute[]
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
        icon: MdBorderAll
    },
    {
        name: 'Orders',
        route: 'orders',
        icon: FaCartPlus
    },
    {
        name: 'Settings',
        route: 'settings',
        icon: FaGear,
        subRoutes: [
               {
                   name: 'Edit Profile',
                   icon: FaUser,
                   route: '/dashboard/settings'
               },
               {
                   name: 'Change Password',
                   icon: FaKey,
                   route: '/dashboard/settings/change-password'
               },
        ]
    },
]