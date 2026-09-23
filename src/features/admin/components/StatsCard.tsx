import type { CustomerStats } from "../../../pages/Admin/Customers"

export type ProductStatsType = {
    item: CustomerStats
}

function StatsCard({item}: ProductStatsType) {
    return (
        <div key={item.label} className="bg-orange-light rounded-lg shadow p-4 w-full">
            <p className="text-[12px] text-secondary-text">{item.label}</p>
            <p className="font-bold">{item.value}</p>
        </div>
    )
}

export default StatsCard