import type { IconType } from "react-icons"
import type { TodayActivityType } from "../static/TodayActivityData"
function Card({name, detail, icon}: TodayActivityType) {
    const Icon: IconType = icon
  return (
    <div className="bg-orange-light/50 rounded-lg shadow p-4 w-full">
        <div className="flex justify-between items-center">
            <p className="text-[12px] text-secondary-text">{name}</p>
            <div className="rounded-full bg-orange-light shadow p-2">
                <Icon/>
            </div>
        </div>
        <p className="font-bold">{detail}</p>
    </div>
  )
}

export default Card