import TodayActivityLayout from "./TodayActivityLayout"
import { CiWarning } from "react-icons/ci";

import type { ProductType } from "../../../types/Product";
import { useNavigate } from "react-router-dom";
import type { QueryObserverResult } from "@tanstack/react-query";


type TodayOrdersType = {
    todayOrders: ProductType[],
    todayStatsError: Error | null,
    todayStatsLoading: boolean,
    refetchTodayStats: () => Promise<QueryObserverResult>,
    isFetchingTodayStats: boolean,
    todayStatsFetched: boolean
}


function InventryAlert({ todayOrders, todayStatsError, todayStatsLoading,refetchTodayStats, isFetchingTodayStats}: TodayOrdersType) {
    const navigate = useNavigate()
    return (
        <TodayActivityLayout
            head={"Inventry Alerts"}
            icon={CiWarning}
            detail={"Products sold today in store."}
            btn={'show'}
            btnData="Products"
            btnFun={() => navigate('/dashboard/products/')}
            children={(
                <div className="grid gap-4">
                    {todayStatsLoading && !isFetchingTodayStats ? (
                        Array.from({ length: 5 }, () => {
                            return <div className="flex justify-between items-center">
                                <div className="grid gap-2">
                                    <div className="h-3 w-30 bg-gray-200 rounded-md animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 w-10 rounded-md animate-pulse"></div>
                                </div>

                                <div className="h-3 bg-gray-200 w-15 rounded-md animate-pulse"></div>
                                <div className="h-6 bg-gray-200 w-15 rounded-md animate-pulse"></div>
                            </div>
                        })
                    ) : todayStatsError || (isFetchingTodayStats && !todayOrders) ? (
                        <div className="w-full p-4 glass-card">
                            <span className="grid gap-2 text-center text-xs">
                                <span>Unable to load today's stats</span>
                                <span>Something went wrong while fetching data!!</span>
                                <button onClick={refetchTodayStats} disabled={isFetchingTodayStats} className={
                                    `px-4 disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                                }>
                                    {isFetchingTodayStats ? 'Refetching...' : 'Try again'}
                                </button>
                            </span>
                        </div>
                    ) :
                        todayOrders && todayOrders.map((item: any) => {
                            return item.label === 'Inventory Alert' && (item.value.length === 0 ? (<div className="grid place-items-center text-xs h-30">
                                No Alerts!!
                            </div>) : item.value.map((product: any) => {
                                return product.variants.map((variant: any, key: number) => {
                                    return key < 5 && <div key={key} className="flex justify-between items-center">
                                        <div>
                                            {product.productName}
                                            <p className="text-secondary-text text-[12px]">Size: {variant.size}</p>
                                        </div>
                                        <p>
                                            <span className="text-[16px] font-bold text-red-600">
                                                {variant.stock}
                                            </span> in stock</p>
                                        <button className={`bg-red-200 p-1 rounded-md shadow text-xs`}>
                                            outofstock
                                        </button>
                                    </div>
                                })
                            })
                            )
                        })
                    }

                </div>
            )} />
    )
}

export default InventryAlert