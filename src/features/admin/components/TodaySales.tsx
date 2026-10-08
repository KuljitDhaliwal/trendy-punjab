import { useNavigate } from "react-router-dom";
import type { OrderType } from "../../../types/Order";
import TodayActivityLayout from "./TodayActivityLayout";
import { CgLoadbarSound } from "react-icons/cg";
import type { QueryObserverResult } from "@tanstack/react-query";

type TodayStats = {
    label: string,
    value: []
}

type TodayOrdersType = {
    todayOrders: TodayStats[],
    todayStatsError: Error | null,
    todayStatsLoading: boolean,
    refetchTodayStats: () => Promise<QueryObserverResult>,
    isFetchingTodayStats: boolean,
    todayStatsFetched: boolean
}

function TodaySales({ todayOrders,
    todayStatsError,
    todayStatsLoading,
    refetchTodayStats,
    isFetchingTodayStats,
    todayStatsFetched }: TodayOrdersType) {
    const navigate = useNavigate()

    const handleViewOrder = (orderID: string | undefined) => {
        navigate(`/dashboard/orders/order/${orderID}`)
    }

    return (
        <TodayActivityLayout
            head={"Today's Sale"}
            btn={'show'}
            btnData="Orders"
            icon={CgLoadbarSound}
            detail={"Products sold today in store."}
            btnFun={() => navigate(`/dashboard/orders/`)}
            children={(
                <div className="w-full overflow-x-auto">
                    <table className="text-left table-auto min-w-120 w-full">
                        <thead>
                            <tr className="w-full shrink-0 text-white bg-orange-dark text-left text-[12px] uppercase">
                                <th className="md:p-4 p-2 rounded-l-lg text-left">#</th>
                                <th className="md:p-4 p-2  shrink-0">customer</th>
                                <th className="md:p-4 p-2  shrink-0">item</th>
                                <th className="md:p-4 p-2  shrink-0">total amount</th>
                                <th className="md:p-4 p-2  shrink-0">payment status</th>
                                <th className="md:p-4 p-2 rounded-r-lg  shrink-0">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {todayStatsLoading && !todayStatsFetched ?
                                Array.from({ length: 6 }, (_, index) => {
                                    return <tr key={index} className="animate-pulse">
                                        <td colSpan={6} className="py-4">
                                            <div className="h-4 w-full rounded-md bg-gray-200" />
                                        </td>
                                    </tr>
                                }) : todayStatsError || (isFetchingTodayStats && !todayOrders) ?
                                    (<tr>
                                        <td colSpan={6} className="py-10 text-center">
                                            <span className="grid gap-2">
                                                <span>Unable to load orders!!</span>
                                                <span>Something went wrong while fetching today's order1</span>
                                                <button onClick={refetchTodayStats} disabled={isFetchingTodayStats} className={
                                                    `px-4 disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                                                }>
                                                    {isFetchingTodayStats ? 'Retrying...' : 'Try again'}
                                                </button>
                                            </span>
                                        </td>
                                    </tr>) :
                                    todayOrders?.map(stats => {
                                        return stats.label === 'Order Created' && (stats.value.length === 0 ? (<tr>
                                            <td colSpan={6} className="py-10 text-center">
                                                No orders yet!!
                                            </td>
                                        </tr>) : stats.value.map((item: OrderType, key) => {
                                            return key <= 4 && <tr key={item._id} className="w-full">
                                                <td className="md:p-4 p-2 py-4 border-border border-b">{key + 1}</td>
                                                <td className="md:p-4 p-2 py-4 border-border border-b">
                                                    {item.customerId.fullname}
                                                </td>
                                                <td className="md:p-4 p-2 py-4 border-border border-b">{item.items.length}</td>
                                                <td className="md:p-4 p-2 py-4 border-border border-b">₹{item.totalAmount}</td>
                                                <td className="md:p-4 p-2 py-4 border-border border-b">{item.paymentStatus}</td>
                                                <td className="md:p-4 p-2 py-4 border-border border-b">
                                                    <button onClick={() => handleViewOrder(item._id)}
                                                        className="bg-orange-dark text-white py-1 px-2 active:scale-95 rounded-md cursor-pointer">View</button>
                                                </td>
                                            </tr>
                                        }))
                                    })
                            }
                        </tbody>
                    </table>
                </div>
            )} />
    )
}

export default TodaySales