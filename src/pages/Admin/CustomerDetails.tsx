import { useNavigate, useParams } from "react-router-dom"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import { MdLocalPhone } from "react-icons/md";
import { BsEnvelope } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { MdOutlineHandshake } from "react-icons/md";
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout";
import { IoShirtOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from "../../components/ui/Button";
import CustomerPagesFooter from "../../features/admin/components/CustomerPagesFooter";
import { useGetCustomer } from "../../features/admin/api/admin.mutations";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Customer } from "./Customers";
import { nameInitials } from "../../utils/NameInitials";
import { calculateOrderAmount } from "../../utils/CalculateTotal";
import { FaAddressCard } from "react-icons/fa";

function CustomerDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { mutate: getCustomer, isPending, error } = useGetCustomer()
    const [customer, setCustomer] = useState<Customer | null>(null)


    useEffect(() => {
        if (id) {
            getCustomer(id, {
                onSuccess: (data) => {
                    console.log('Data', data)
                    setCustomer(data.customer)
                },
                onError: (error) => {
                    toast(error.message)
                }
            })
        }
    }, [id, getCustomer])

    const handleEditCustomer = () => {
        navigate(`/dashboard/customers/edit-customer/${id}`)
    }

    const handleCancel = () => {

    }


    const handleViewOrder = (orderID: string) => {
        navigate(`/dashboard/orders/order/${orderID}`)
    }

    return (
        <div className="grid gap-6">
            <AdminPagesHeader first={'Customers / Customer Details'}
                main={'Customer Details'} third={'Check customer information, sizes, measurements and order history.'}
                right={(
                    <Button children={
                        <p className="flex items-center gap-1">
                            <IoIosArrowRoundBack /> Back to Customers
                        </p>
                    } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate('/dashboard/customers')} />
                )} />


            {/* Customer's Personal Details Banner */}
            <section className="glass-card p-4 flex justify-between items-start">
                {isPending ? (
                    <div className="grid place-items-center h-25 w-full">
                        <p>Loading...</p>
                    </div>
                ) : error ? (
                    <div className="grid place-items-center h-25 w-full">
                        <p>Something went wrong!</p>
                    </div>
                ) : (
                    <>
                        <div className="flex gap-2">
                            <div className="flex gap-2">
                                <div className="rounded-full p-2 bg-orange-dark text-white h-fit shadow">
                                    <p className="text-xl">{nameInitials(customer?.fullname ?? '')}</p>
                                </div>
                                <div className="grid gap-2">
                                    <p>{customer?.fullname}</p>
                                    <div className="grid gap-2">
                                        <div className="flex gap-1 items-center">
                                            <MdLocalPhone />
                                            <p className="text-[12px] text-secondary-text">
                                                {customer?.phone}
                                            </p>
                                        </div>
                                        {customer && customer.email && (
                                            <div className="flex gap-1 items-center">
                                                <BsEnvelope />
                                                <p className="text-[12px] text-secondary-text">
                                                    {customer?.email}
                                                </p>
                                            </div>
                                        )}
                                        {customer && (
                                            <div className="flex gap-1 items-center">
                                                <MdOutlineHandshake />
                                                <p className="text-[12px] text-secondary-text">
                                                    customer since {new Date(customer.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2 max-w-100">
                            <Button children={
                                <p className="flex items-center gap-1">
                                    + Create Order
                                </p>
                            } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate(`/dashboard/orders/create-order/${id}`)} />
                        </div>
                    </>

                )
                }
            </section>

            <section className="glass-card p-4">
                {isPending ? (
                    <div className="grid place-items-center h-25 w-full">
                        <p>Loading...</p>
                    </div>
                ) : error ? (
                    <div className="grid place-items-center h-25 w-full">
                        <p>Something went wrong!</p>
                    </div>
                ) : (
                    <div className="md:grid-cols-2 grid gap-4">
                        <div className="flex gap-2">
                            <div className="rounded-full p-2 bg-orange-dark h-fit">
                                <FaAddressCard className="text-white text-sm" />
                            </div>

                            <address className="grid gap-2">
                                <p>
                                    Address: <span className="text-[12px] text-secondary-text">
                                        {customer?.address}
                                    </span>
                                </p>
                                <p>
                                    City: <span className="text-[12px] text-secondary-text">
                                        {customer?.city}
                                    </span>
                                </p>
                                <p>
                                    Pincode: <span className="text-[12px] text-secondary-text">
                                        {customer?.pincode}
                                    </span>
                                </p>
                            </address>
                        </div>
                        {customer && customer.notes && (
                            <section className="flex justify-between items-start">
                                <div className="flex gap-2">
                                    <div className="rounded-full p-2 bg-orange-dark h-fit">
                                        <GrNotes className="text-white text-sm" />
                                    </div>
                                    <div className="grid">
                                        <p>Notes</p>
                                        <p className="text-[12px] text-secondary-text">{customer?.notes}</p>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                )
                }




            </section>



            {/* Customer's Stats */}
            <section className="grid gap-4">
                <div className="grid gap-2">
                    <p className="font-bold">Customer Overview</p>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 glass-card justify-between items-center">
                    <div className="card border border-border p-4 rounded-l-lg grid gap-2">
                        <p className="text-[12px] text-secondary-text">Last Visit</p>
                        <p className="">{customer && customer.lastVisit ? new Date(customer.lastVisit).toLocaleDateString() : '--'}</p>
                    </div>
                    <div className="card border border-border p-4 grid gap-2">
                        <p className="text-[12px] text-secondary-text">Total Orders</p>
                        <p className="">{customer?.orders?.length ?? '--'}</p>
                    </div>
                    <div className="card border border-border p-4 grid gap-2">
                        <p className="text-[12px] text-secondary-text">Total Spent</p>
                        <p className="">₹{calculateOrderAmount(customer?.orders) ?? '--'}</p>
                    </div>
                    <div className="card border border-border p-4 rounded-r-lg grid gap-2">
                        <p className="text-[12px] text-secondary-text">Preferred Contact</p>
                        <p className="">{customer?.phone ?? '--'}</p>
                    </div>
                </div>
            </section >


            {/* Customer's Sizes */}
            <TodayActivityLayout
                head="Customer Sizes"
                btn="not"
                detail="Save their commonly used sizes"
                icon={IoShirtOutline}
                children={(
                    <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3">
                        <div className="card glass-card p-4 rounded-md grid gap-2">
                            <p className="text-secondary-text text-[12px]">Shirt Size</p>
                            <p className="font-bold">{customer?.shirtSize ?? '--'}</p>
                        </div>
                        <div className="card glass-card p-4 rounded-md grid gap-2">
                            <p className="text-secondary-text text-[12px]">T-Shirt Size</p>
                            <p className="font-bold">{customer?.tshirtSize ?? '--'}</p>
                        </div>
                        <div className="card glass-card p-4 rounded-md grid gap-2">
                            <p className="text-secondary-text text-[12px]">Jeans Size</p>
                            <p className="font-bold">{customer?.jeansSize ?? '--'}</p>
                        </div>
                        <div className="card glass-card p-4 rounded-md grid gap-2">
                            <p className="text-secondary-text text-[12px]">Jacket Size</p>
                            <p className="font-bold">{customer?.jacketSize ?? '--'}</p>
                        </div>
                        <div className="card glass-card p-4 rounded-md grid gap-2">
                            <p className="text-secondary-text text-[12px]">Shoe Size</p>
                            <p className="font-bold">{customer?.shoeSize ?? '--'}</p>
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
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-120 table-auto">
                            <thead className="text-left text-white bg-orange-dark">
                                <th className="p-4 rounded-l-lg">#</th>
                                <th className="p-4 ">Order ID</th>
                                <th className="p-4 ">Date</th>
                                <th className="p-4 ">Items</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4 rounded-r-lg">Receipt</th>
                            </thead>
                            <tbody>

                                {
                                    isPending ? (
                                        <tr>
                                            <td colSpan={7} className="py-10 text-center">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan={7} className="py-10">
                                                Something error
                                            </td>
                                        </tr>
                                    ) :
                                        customer && (customer.orders?.length === 0 || !customer?.orders) ?
                                            (
                                                <tr>
                                                    <td colSpan={4} className="py-10">
                                                        <span className="grid gap-2 justify-center">
                                                            <span className="text-center">No Orders!!</span>
                                                            <span>
                                                                <Button children={
                                                                    <p className="flex items-center gap-1">
                                                                        + Create Order
                                                                    </p>
                                                                } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate('/dashboard/customers')} />
                                                            </span>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ) :
                                            customer?.orders?.map((item, key) => {
                                                return <tr key={item._id} className="py-2 text-xs">
                                                    <td className="p-4 border-b border-border">{key + 1}</td>
                                                    <td className="p-4 border-b border-border">{item.orderNumber}</td>
                                                    <td className="p-4 border-b border-border">{new Date(item.createdAt).toLocaleDateString()}</td>
                                                    <td className="p-4 border-b border-border">{
                                                        item.items.map(product => {
                                                            return <span>{product.productName}</span>
                                                        })
                                                    }</td>
                                                    <td className="p-4 border-b border-border">₹{item.totalAmount}</td>
                                                    <td className="flex gap-4 items-center p-4 border-b border-border">
                                                        <button type="button" className="bg-orange-dark text-white py-1 px-2 active:scale-95 rounded-md cursor-pointer"
                                                            onClick={() => handleViewOrder(item._id)}>View</button>
                                                    </td>
                                                </tr>
                                            })
                                }




                            </tbody>
                        </table>
                    </div>
                )}
            />


            {/* Quick Actions  */}
            <CustomerPagesFooter btn1Text="Cancel" btn2Text="Edit Customer"
                btn1ClickFun={handleCancel} btn2ClickFun={handleEditCustomer} />

        </div >
    )
}

export default CustomerDetails