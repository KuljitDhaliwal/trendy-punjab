import { useNavigate } from "react-router-dom";
import type { OrderType } from "../../../types/Order";
import TodayActivityLayout from "./TodayActivityLayout";
import { CgLoadbarSound } from "react-icons/cg";

type TodayStats = {
    label: string,
    value: []
}

type TodayOrdersType = {
    todayOrders: TodayStats[],
    todayStatsError: Error | null,
    todayStatsLoading: boolean
}

function TodaySales({ todayOrders, todayStatsError, todayStatsLoading }: TodayOrdersType) {
    const navigate = useNavigate()
    return (
        <TodayActivityLayout
            head={"Today's Sale"}
            btn={'show'}
            btnData="Orders"
            icon={CgLoadbarSound}
            detail={"Products sold today in store."}
            btnFun={()=>navigate(`/dashboard/orders/`)}
            children={(
                <div className="w-full overflow-x-auto">
                    <table className="text-left table-auto min-w-120 w-full">
                        <thead>
                            <tr className="w-full shrink-0 text-white bg-orange-dark text-left text-[12px] uppercase">
                                <th className="p-4 rounded-l-lg text-left">#</th>
                                <th className="p-4  shrink-0">customer</th>
                                <th className="p-4  shrink-0">item</th>
                                <th className="p-4  shrink-0">total amount</th>
                                <th className="p-4  shrink-0">payment status</th>
                                <th className="p-4 rounded-r-lg  shrink-0">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {todayStatsLoading ?
                                (<tr>
                                    <td colSpan={7} className="py-10 text-center">
                                        Loading...
                                    </td>
                                </tr>) : todayStatsError ?
                                    (<tr>
                                        <td colSpan={7} className="py-10 text-center">
                                            Something error
                                        </td>
                                    </tr>) :
                                    todayOrders && todayOrders.map(stats => {
                                        console.log('Statsss', stats)
                                        return stats.label === 'Order Created' && (stats.value.length === 0 ? (<tr>
                                            <td colSpan={7} className="py-10 text-center">
                                                No orders yet!!
                                            </td>
                                        </tr>) : stats.value.map((item: OrderType, key) => {
                                            return key <= 4 && <tr key={item._id} className="w-full">
                                                <td className="p-4 border-border border-b">{key + 1}</td>
                                                <td className="p-4 border-border border-b">
                                                    {item.customerId.fullname}
                                                </td>
                                                <td className="p-4 border-border border-b">{item.items.length}</td>
                                                <td className="p-4 border-border border-b">₹{item.totalAmount}</td>
                                                <td className="p-4 border-border border-b">{item.paymentStatus}</td>
                                                <td className="p-4 border-border border-b">
                                                    <button className="underline cursor-pointer">View</button>
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