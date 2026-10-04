import TodayActivityLayout from "./TodayActivityLayout"
import { CiWarning } from "react-icons/ci";

import type { ProductType } from "../../../types/Product";
import { useNavigate } from "react-router-dom";


type TodayOrdersType = {
    todayOrders: ProductType[],
    todayStatsError: Error | null,
    todayStatsLoading: boolean
}


function InventryAlert({ todayOrders, todayStatsError, todayStatsLoading }: TodayOrdersType) {
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
                <div className="grid gap-2">
                    {todayStatsLoading ? (
                        <div className="w-full h-30 rounded-lg grid place-items-center bg-orange-light animate-pulse">
                            <p>Loading...</p>
                        </div>
                    ) : todayStatsError ? (
                        <div className="w-full h-30 rounded-lg shadow bg-orange-light">
                            <p>Something went wrong!</p>
                        </div>
                    ) :
                        todayOrders && todayOrders.map((item: any) => {
                            return item.label === 'Inventory Alert' && (item.value.length === 0 ? (<div className="grid place-items-center h-30">
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