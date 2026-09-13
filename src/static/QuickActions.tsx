import type { IconType } from "react-icons"
import { FiUserPlus, FiSearch, FiFilePlus, FiPackage, FiBox } from "react-icons/fi"

export type QuickAction = {
  id: number
  title: string
  description: string
  route: string
  icon: IconType
}

export const QuickActionData: QuickAction[] = [
  {
    id: 1,
    title: "Add customer",
    description: "Create a profile and save sizes",
    route: "/customers/add",
    icon: FiUserPlus,
  },
  {
    id: 2,
    title: "Find customer",
    description: "Search phone or customer name",
    route: "/customers",
    icon: FiSearch,
  },
  {
    id: 3,
    title: "Create sale",
    description: "Add products and complete a sale",
    route: "/sales/create",
    icon: FiFilePlus,
  },
  {
    id: 4,
    title: "Add product",
    description: "Register an item and sizes",
    route: "/products/add",
    icon: FiPackage,
  },
  {
    id: 5,
    title: "Update inventory",
    description: "Adjust stock by size",
    route: "/inventory",
    icon: FiBox,
  },
]