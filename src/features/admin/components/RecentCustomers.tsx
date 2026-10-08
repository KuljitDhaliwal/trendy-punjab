import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import type { Customer } from "../../../types/Customer";
import TodayActivityLayout from "./TodayActivityLayout"
import { LuUsersRound } from "react-icons/lu";
import type { QueryObserverResult } from "@tanstack/react-query";

type CustomerRecentType = {
    customerData: Customer[],
    customerError: Error | null,
    customerLoading: boolean,
    customerIsFetching: boolean,
    customerIsFetched: boolean,
    customerRefetched: () => Promise<QueryObserverResult>
}


function RecentCustomers({ customerData, customerError,
    customerLoading,
    customerIsFetching,
    customerIsFetched,
    customerRefetched }: CustomerRecentType) {
    const navigate = useNavigate()
    return (
        <TodayActivityLayout
            head={'Recent Customers'}
            btn={'show'}
            btnData="Customers"
            btnFun={() => navigate('/dashboard/customers/')}
            detail={'Customers who visited / purchased recently.'}
            icon={LuUsersRound}
            children={(
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left min-w-120 table-auto">
                        <thead>
                            <tr className="w-full text-white bg-orange-dark text-[12px]">
                                <th className="md:p-4 p-2 rounded-l-lg">#</th>
                                <th className="md:p-4 p-2">CUSTOMER</th>
                                <th className="md:p-4 p-2">PHONE</th>
                                <th className="md:p-4 p-2">EMAIL</th>
                                <th className="md:p-4 p-2 rounded-r-lg">LAST VISIT</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {customerLoading && !customerIsFetched ?
                                (
                                    Array.from({ length: 5 }, (_, index) => {
                                        return <tr key={index} className="animate-pulse">
                                            <td colSpan={5} className="py-4">
                                                <div className="h-4 w-full rounded-md bg-gray-200" />
                                            </td>
                                        </tr>
                                    })
                                ) : customerError || (customerIsFetching && !customerData) ?
                                    (<tr>
                                        <td colSpan={5} className="py-10 text-center">
                                            <span className="grid gap-2 w-full text-center text-xs">
                                                <span>Unable to load today's stats</span>
                                                <span>Something went wrong while fetching data!!</span>
                                                <button onClick={customerRefetched} disabled={customerIsFetching} className={
                                                    `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                                                }>
                                                    {customerIsFetching ? 'Refetching...' : 'Try again'}
                                                </button>
                                            </span>
                                        </td>
                                    </tr>) :
                                    customerData.length === 0 ? <tr>
                                        <td colSpan={5}>
                                            <span className="grid gap-2 py-10">
                                                <p className="text-center">No customer! Please add</p>
                                                <Button children={'+ Add Customer'} onClick={() => navigate('/dashboard/customers/add-customer')}
                                                    className="text-[12px] px-4 py-2 block w-fit m-auto bg-orange-dark text-white" />
                                            </span>
                                        </td>
                                    </tr> :
                                        customerData.map((item, key) => {
                                            return key < 5 && <tr key={item._id}>
                                                <td className="md:p-4 p-2 py-4 border-border border-b">
                                                    {key + 1}
                                                </td>
                                                <td className="md:p-4 p-2 py-4 border-border border-b">
                                                    {item.fullname}
                                                </td>
                                                <td className="md:p-4 p-2 py-4 border-border border-b">{item.phone ?? '--'}</td>
                                                <td className="md:p-4 p-2 py-4 border-border border-b">{item.email ?? '--'}</td>
                                                <td className="md:p-4 p-2 py-4 border-border border-b">{item.lastVisit ? new Date(item.lastVisit).toLocaleDateString() : '--'}</td>
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