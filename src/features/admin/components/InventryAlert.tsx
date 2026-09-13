import TodayActivityLayout from "./TodayActivityLayout"
import { CiWarning } from "react-icons/ci";
import { InventoryAlertData } from "../../../static/InventryAlertData";

function InventryAlert() {
    const btnColors = {
        low: 'bg-red-200',
        out: 'bg-red-600'
    }
    return (
        <TodayActivityLayout
            head={"Inventry Alerts"}
            icon={CiWarning}
            detail={"Products sold today in store."}
            btn={'show'}
            children={(
                <div className="grid gap-2">
                    {InventoryAlertData.map(item => {
                        return <div key={item.id} className="flex justify-between items-center">
                            <div>
                                {item.productName}
                                <p className="text-secondary-text text-[12px]">Size: {item.size}</p>
                            </div>
                            <p>
                                <span className="text-[16px] font-bold text-red-600">
                                    {item.stock}
                                </span> in stock</p>
                            <button className={`${item.alert === 'low' ? btnColors.low : btnColors.out} px-2 rounded-md shadow`}>
                                {item.alert}
                            </button>
                        </div>
                    })}

                </div>
            )} />
    )
}

export default InventryAlert