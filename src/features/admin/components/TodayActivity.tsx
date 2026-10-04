import StatsCard from "./StatsCard"

export type TodayStatsType = {
    label: string,
    value: number
}

type TodatStatsPropsType = {
    todayStats: TodayStatsType[],
    todayStatsLoading: boolean,
    todayStatsError: Error | null,
    
}


function TodayActivity({ todayStats, todayStatsLoading, todayStatsError }: TodatStatsPropsType) {
    return (
        <div className="grid gap-6">
            <div className="grid gap-2">
                <p className="text-secondary-text">Today's Activity</p>
                <p className="font-bold">Today's Overview</p>
            </div>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 justify-between items-center">
                {todayStatsLoading ? (<div className="w-full h-20 bg-orange-light rounded-lg shadow grid place-items-center animate-pulse">
                    <p>Loading...</p>
                </div>) : todayStatsError ? (
                    <div className="w-full h-20 bg-orange-light rounded-lg shadow grid place-items-center">
                        <p>Something went wrong!!</p>
                    </div>
                ) : todayStats && todayStats.map((item: any, key) => {
                    console.log('Value', item)
                    return <StatsCard key={key} item={item.label === 'Order Created' || item.label === 'Inventory Alert' ? { ...item, ['value']: item.value.length } : item} />
                })}
            </div>
        </div>
    )
}

export default TodayActivity