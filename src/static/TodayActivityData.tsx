import type { IconType } from "react-icons"
import { CiUser } from "react-icons/ci";
import { VscListUnordered } from "react-icons/vsc";
import { GoGraph } from "react-icons/go";
import { CiWarning } from "react-icons/ci";

export interface TodayActivityType {
    name: string,
    detail: number
    icon: IconType
}

export const TodayActivityData: TodayActivityType [] = [
    {
        name: "Customer's served",
        detail: 8,
        icon:  CiUser
    },
    {
        name: "Orders created",
        detail: 18,
        icon:  VscListUnordered
    },
    {
        name: "Today’s sales",
        detail: 48920,
        icon:  GoGraph
    },
    {
        name: "Needs attention",
        detail: 4,
        icon:  CiWarning
    },
]