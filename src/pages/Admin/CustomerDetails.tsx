import { useNavigate, useParams } from "react-router-dom"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import { customersData } from "../../static/CustomersData"
import { MdLocalPhone } from "react-icons/md";
import { BsEnvelope } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { MdOutlineHandshake } from "react-icons/md";
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout";
import { IoShirtOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";



function CustomerDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    //Filter User Temp
    const customer = customersData.find(item => item.id === Number(id))
    return (
        <div className="grid gap-6">
            <AdminPagesHeader first={'Customers / Customer Details'}
                main={'Customer Details'} third={'Check customer information, sizes, measurements and order history.'}
                right={(
                    <button className="border-border border px-2 py-2 cursor-pointer rounded-lg text-[12px]
                shadow bg-orange-dark text-white shrink-0" onClick={() => navigate('/dashboard/customers')}>
                        Back to Customers
                    </button>
                )} />


            {/* Customer's Personal Details Banner */}
            <section className="rounded-lg bg-orange-light/50 p-4 flex justify-between items-start">
                <div className="flex gap-2">
                    <div className="flex gap-2">
                        <div className="rounded-full p-2 bg-orange-dark text-white h-fit shadow">
                            <p className="text-xl">KS</p>
                        </div>
                        <div className="grid gap-2">
                            <p>{customer?.name}</p>
                            <div className="grid gap-2">
                                <div className="flex gap-1 items-center">
                                    <MdLocalPhone />
                                    <p className="text-[12px] text-secondary-text">
                                        {customer?.phone}
                                    </p>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <BsEnvelope />
                                    <p className="text-[12px] text-secondary-text">
                                        {customer?.email}
                                    </p>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <MdOutlineHandshake />
                                    <p className="text-[12px] text-secondary-text">
                                        customer since {customer?.customerSince}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-2 max-w-100">
                    <div className="flex gap-2">
                        <div className="rounded-full p-2 bg-orange-dark h-fit">
                            <GrNotes className="text-white text-sm" />
                        </div>
                        <div className="grid">
                            <p>Notes</p>
                            <p className="text-[12px] text-secondary-text">{customer?.notes}</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Customer's Stats */}
            <section className="grid gap-6">
                <div className="grid gap-2">
                    <p className="text-secondary-text">Today's Activity</p>
                    <p className="font-bold">Today's Overview</p>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 bg-orange-light justify-between items-center">
                    <div className="card border border-border p-4 rounded-l-lg">
                        <p className="text-[12px] text-secondary-text">Last Visit</p>
                        <p className="font-bold">{customer?.lastVisit}</p>
                    </div>
                    <div className="card border border-border p-4">
                        <p className="text-[12px] text-secondary-text">Total Orders</p>
                        <p className="font-bold">{customer?.orders}</p>
                    </div>
                    <div className="card border border-border p-4">
                        <p className="text-[12px] text-secondary-text">Total Spent</p>
                        <p className="font-bold">{customer?.totalSpent}</p>
                    </div>
                    <div className="card border border-border p-4 rounded-r-lg">
                        <p className="text-[12px] text-secondary-text">Preferred Contact</p>
                        <p className="font-bold">{customer?.phone}</p>
                    </div>
                </div>
            </section >


            {/* Customer's Sizes */}
            <TodayActivityLayout
                head="Standard Sizes"
                btn="not"
                detail="Save their commonly used sizes"
                icon={IoShirtOutline}
                children={(
                    <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3">
                        <div className="card bg-white p-4 rounded-md">
                            <p className="text-secondary-text text-[12px]">Shirt Size</p>
                            <p className="font-bold">{customer?.shirtSize}</p>
                        </div>
                        <div className="card bg-white p-4 rounded-md">
                            <p className="text-secondary-text text-[12px]">T-Shirt Size</p>
                            <p className="font-bold">{customer?.tshirtSize}</p>
                        </div>
                        <div className="card bg-white p-4 rounded-md">
                            <p className="text-secondary-text text-[12px]">Jeans Size</p>
                            <p className="font-bold">{customer?.jeansSize}</p>
                        </div>
                        <div className="card bg-white p-4 rounded-md">
                            <p className="text-secondary-text text-[12px]">Jacket Size</p>
                            <p className="font-bold">{customer?.jacketSize}</p>
                        </div>
                        <div className="card bg-white p-4 rounded-md">
                            <p className="text-secondary-text text-[12px]">Shoe Size</p>
                            <p className="font-bold">{customer?.shoeSize}</p>
                        </div>
                    </div>
                )}
            />


            {/* Order History */}
            <TodayActivityLayout
                head="Order History"
                btn="not"
                detail="Checkout the order history"
                icon={MdHistory}
                children={(
                    <div>
                        <table className="w-full">
                            <thead className="text-left text-secondary-text">
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Amount</th>
                            </thead>
                            <tbody>
                                {customer?.orderHistory?.map(item => {
                                    return <tr key={item.id} className="py-2">
                                        <td className="py-2 border-b border-border">{item.id}</td>
                                        <td className="py-2 border-b border-border">{item.date}</td>
                                        <td className="py-2 border-b border-border">{item.items}</td>
                                        <td className="py-2 border-b border-border">{item.amount}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            />


            {/* Quick Actions  */}
            <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-2 text-sm">
                <button className="px-4 cursor-pointer py-2 border rounded-lg border-border">Edit Customer</button>
                <button className="px-4 cursor-pointer py-2 border rounded-lg bg-orange-dark text-white border-border">Create Order</button>
            </div>
        </div >
    )
}

export default CustomerDetails