import type { CustomerStats } from "../../../pages/Admin/Customers"

type ProductStatsType = {
    item: CustomerStats
}

function StatsCard({item}: ProductStatsType) {
    return (
        <div key={item.label} className="bg-orange-light w-full rounded-lg shadow p-4">
            <p className="text-[12px] text-secondary-text">{item.label}</p>
            <p className="font-bold">{item.value}</p>
        </div>
    )
}

export default StatsCard