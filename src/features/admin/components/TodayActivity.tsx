import type { QueryObserverResult } from "@tanstack/react-query"
import SkeletonCard from "../../../components/ui/SkeletonCard"
import StatsCard from "./StatsCard"

export type TodayStatsType = {
    label: string,
    value: number
}

type TodatStatsPropsType = {
    todayStats: TodayStatsType[],
    todayStatsLoading: boolean,
    todayStatsError: Error | null,
    refetchTodayStats: () => Promise<QueryObserverResult>,
    isFetchingTodayStats: boolean,
    todayStatsFetched: boolean
}


function TodayActivity({ todayStats, 
    todayStatsLoading, 
    todayStatsError, 
    refetchTodayStats, 
    isFetchingTodayStats,
    todayStatsFetched }: TodatStatsPropsType) {
    return (
        <div className="grid gap-6">
            <div className="grid gap-2">
                <p className="text-secondary-text">Today's Activity</p>
                <p className="font-bold">Today's Overview</p>
            </div>
            <div>
                {todayStatsLoading && !todayStatsFetched ? (
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 justify-between items-center">
                        {Array.from({ length: 4 }, (_,index) => {
                            return <SkeletonCard key={index}/>
                        })}
                    </div>
                ) : todayStatsError || (isFetchingTodayStats && !todayStats)  ? (
                    <div className="w-full p-4 glass-card grid place-items-center">
                        <span className="grid gap-2 w-full text-center text-xs">
                            <span>Unable to load today's stats</span>
                            <span>Something went wrong while fetching data!!</span>
                            <button onClick={refetchTodayStats} disabled={isFetchingTodayStats} className={
                                `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                            }>
                                {isFetchingTodayStats ? 'Refetching...' : 'Try again'}
                            </button>
                        </span>
                    </div>
                ) :
                    (
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 justify-between items-center">
                            {todayStats?.map((item: any, key) => {
                                return <StatsCard key={key} item={item.label === 'Order Created' || item.label === 'Inventory Alert' ? { ...item, ['value']: item.value.length } : item} />
                            })}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default TodayActivity