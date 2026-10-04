import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import type { Customer } from "../../../types/Customer";
import TodayActivityLayout from "./TodayActivityLayout"
import { LuUsersRound } from "react-icons/lu";

type CustomerRecentType = {
    customerData: Customer[],
    customerError: Error | null,
    customerLoading: boolean
}


function RecentCustomers({ customerData, customerError, customerLoading }: CustomerRecentType) {
    const navigate = useNavigate()
    return (
        <TodayActivityLayout
            head={'Recent Customers'}
            btn={'show'}
            btnData="Customers"
            btnFun={()=>navigate('/dashboard/customers/')}
            detail={'Customers who visited / purchased recently.'}
            icon={LuUsersRound}
            children={(
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left min-w-120 table-auto">
                        <thead>
                            <tr className="w-full text-white bg-orange-dark text-[12px]">
                                <th className="p-4 rounded-l-lg">#</th>
                                <th className="p-4">CUSTOMER</th>
                                <th className="p-4">PHONE</th>
                                <th className="p-4">EMAIL</th>
                                <th className="p-4 rounded-r-lg">LAST VISIT</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {customerLoading ?
                                (<tr>
                                    <td colSpan={7} className="py-10 text-center">
                                        Loading...
                                    </td>
                                </tr>) : customerError ?
                                    (<tr>
                                        <td colSpan={7} className="py-10 text-center">
                                            Something error
                                        </td>
                                    </tr>) :
                                    customerData.length === 0 ? <tr>
                                        <td colSpan={7}>
                                            <span className="grid gap-2 py-10">
                                                <p className="text-center">No customer! Please add</p>
                                                <Button children={'+ Add Customer'} onClick={() => navigate('/dashboard/customers/add-customer')}
                                                    className="text-[12px] px-4 py-2 block w-fit m-auto bg-orange-dark text-white" />
                                            </span>
                                        </td>
                                    </tr> :
                                        customerData.map((item, key) => {
                                            return key < 5 && <tr key={item._id}>
                                                <td className="p-4 border-border border-b">
                                                    {key + 1}
                                                </td>
                                                <td className="p-4 border-border border-b">
                                                    {item.fullname}
                                                </td>
                                                <td className="p-4 border-border border-b">{item.phone ?? '--'}</td>
                                                <td className="p-4 border-border border-b">{item.email ?? '--'}</td>
                                                <td className="p-4 border-border border-b">{item.lastVisit ? new Date(item.lastVisit).toLocaleDateString() : '--'}</td>
                                            </tr>
                                        })
                            }
                        </tbody>
                    </table>
                </div>
            )}
        />
    )
}

export default RecentCustomers