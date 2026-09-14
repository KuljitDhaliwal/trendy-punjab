import { TodaySalesData } from "../../../static/TodaySalesData";
import TodayActivityLayout from "./TodayActivityLayout";
import { CgLoadbarSound } from "react-icons/cg";


function TodaySales() {
    return (
        <TodayActivityLayout 
        head={"Today's Sale"} 
        btn={'show'}
        icon={CgLoadbarSound}
        detail={"Products sold today in store."} 
        children={(
            <div className="w-full">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="w-full text-secondary-text text-[12px]">
                            <th className="py-3">PRODUCT</th>
                            <th className="py-3">QTY</th>
                            <th className="py-3">PRICE</th>
                            <th className="py-3">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TodaySalesData.map(item => {
                            return <tr key={item.id}>
                                <td className="py-3 border-border border-b">
                                    {item.productName}
                                    <br />
                                    <p className="text-secondary-text text-[12px]">
                                        Size: {item.size} . {item.category}
                                    </p>
                                </td>
                                <td className="py-3 border-border border-b">{item.quantity}</td>
                                <td className="py-3 border-border border-b">₹{item.price}</td>
                                <td className="py-3 border-border border-b">0000</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )} />
    )
}

export default TodaySales