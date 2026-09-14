import type { IconType } from "react-icons"
import { FiUserPlus, FiSearch } from "react-icons/fi"

export type QuickAction = {
  id: number
  title: string
  description: string
  route: string
  icon: IconType,
}

export const QuickActionData: QuickAction[] = [
  {
    id: 1,
    title: "Add customer",
    description: "Create a profile and save sizes",
    route: "/dashboard/customers/add-customer",
    icon: FiUserPlus,
  },
  {
    id: 2,
    title: "Find customer",
    description: "Search phone or customer name",
    route: "#findCustomers",
    icon: FiSearch,
  }
]