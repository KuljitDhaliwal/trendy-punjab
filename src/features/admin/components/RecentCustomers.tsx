import { RecentCustomerData } from "../../../static/RecentCustomerData";
import TodayActivityLayout from "./TodayActivityLayout"
import { LuUsersRound } from "react-icons/lu";

function  RecentCustomers() {
    return (
        <TodayActivityLayout
            head={'Recent Customers'}
            btn={'show'}
            detail={'Customers who visited / purchased recently.'}
            icon={LuUsersRound}
            children={(
                <div className="w-full">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="w-full text-secondary-text text-[12px]">
                                <th className="py-3">CUSTOMER</th>
                                <th className="py-3">PHONE</th>
                                <th className="py-3">LAST VISIT</th>
                                <th className="py-3">LAST PURCHASE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RecentCustomerData.map(item => {
                                return <tr key={item.id}>
                                    <td className="py-3 border-border border-b">
                                        {item.name}
                                    </td>
                                    <td className="py-3 border-border border-b">{item.phone}</td>
                                    <td className="py-3 border-border border-b">{item.lastVisit}</td>
                                    <td className="py-3 border-border border-b">{item.lastPurchase}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        />
    )
}

export default RecentCustomers