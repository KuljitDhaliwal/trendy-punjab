import { useNavigate, useParams } from "react-router-dom"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import { MdLocalPhone } from "react-icons/md";
import { BsEnvelope } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { MdOutlineHandshake } from "react-icons/md";
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout";
import { IoShirtOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../../components/ui/Button";
import CustomerPagesFooter from "../../features/admin/components/CustomerPagesFooter";
import { useGetCustomer } from "../../features/admin/api/admin.mutations";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Customer } from "./Customers";
import { nameInitials } from "../../utils/NameInitials";
import { calculateOrderAmount } from "../../utils/CalculateTotal";
import { FaAddressCard } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

function CustomerDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { mutate: getCustomer, isPending, error } = useGetCustomer()
    const [customer, setCustomer] = useState<Customer | null>(null)

    const fetchCustomer = () => {
        if (id) {
            getCustomer(id, {
                onSuccess: (data) => {
                    setCustomer(data.customer)
                },
                onError: (error) => {
                    toast(error.message)
                }
            })
        }
    }

    useEffect(() => {
        fetchCustomer()
    }, [id])


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
                        <span className="flex gap-2 items-center">
                            <IoIosArrowBack />
                            Back to Customers
                        </span>
                    } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate('/dashboard/customers')} />
                )} />


            {/* Customer's Personal Details Banner */}
            <section className="glass-card p-4 flex justify-between items-start">
                {isPending ? (
                    <div className="flex md:flex-row flex-col gap-4 justify-between w-full items-start">
                        <div className="flex gap-2">
                            <div className="rounded-full p-2 w-10 h-10 bg-gray-200 shadow animate-pulse">
                            </div>
                            <div className="grid gap-2">
                                <div className="bg-gray-200 h-4 rounded-md w-30 shadow"></div>
                                <div className="grid gap-2">
                                    <div className="flex gap-1 items-center">
                                        <MdLocalPhone />
                                        <div className="bg-gray-200 h-3 rounded-md w-25 shadow"></div>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <BsEnvelope />
                                        <div className="bg-gray-200 h-3 rounded-md w-40 shadow"></div>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <MdOutlineHandshake />
                                        <div className="bg-gray-200 h-3 rounded-md w-40 shadow"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button children={
                            ''
                        } className="text-[12px] md:w-30 w-full px-4 py-2 h-9 bg-gray-200 text-white" onClick={() => navigate(`/dashboard/orders/create-order/${id}`)} />
                    </div>
                ) : error ? (
                    <div className="grid place-items-center h-25 w-full">
                        <span className="grid gap-2 w-full text-center text-xs">
                            <span>Unable to load today's stats</span>
                            <span>Something went wrong while fetching data!!</span>
                            <button onClick={fetchCustomer} disabled={isPending} className={
                                `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                            }>
                                {isPending ? 'Refetching...' : 'Try again'}
                            </button>
                        </span>
                    </div>
                ) : (
                    <div className="flex md:flex-row gap-4 w-full justify-between flex-col items-start">

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


                        <Button children={
                            <span className="flex gap-2 items-center">
                                <FaCirclePlus />
                                Create Order
                            </span>
                        } className="text-[12px] md:w-auto w-full px-4 py-2 bg-orange-dark text-white" onClick={() => navigate(`/dashboard/orders/create-order/${id}`)} />
                    </div>

                )
                }
            </section>

            <section className="glass-card p-4">
                {isPending ? (
                    <div className="flex gap-2">
                        <div className="rounded-full p-2 bg-orange-dark h-fit">
                            <FaAddressCard className="text-white text-sm" />
                        </div>

                        <address className="grid gap-2">
                            <div className="flex items-center gap-2">
                                Address: <div className="bg-gray-200 h-3 rounded-md w-25 shadow"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                City: <div className="bg-gray-200 h-3 rounded-md w-25 shadow"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                Pincode: <div className="bg-gray-200 h-3 rounded-md w-25 shadow"></div>
                            </div>
                        </address>
                    </div>
                ) : error ? (
                    <div className="grid place-items-center h-25 w-full">
                        <span className="grid gap-2 w-full text-center text-xs">
                            <span>Unable to load today's stats</span>
                            <span>Something went wrong while fetching data!!</span>
                            <button onClick={fetchCustomer} disabled={isPending} className={
                                `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                            }>
                                {isPending ? 'Refetching...' : 'Try again'}
                            </button>
                        </span>
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
                                        {customer?.address ?? '--'}
                                    </span>
                                </p>
                                <p>
                                    City: <span className="text-[12px] text-secondary-text">
                                        {customer?.city ?? '--'}
                                    </span>
                                </p>
                                <p>
                                    Pincode: <span className="text-[12px] text-secondary-text">
                                        {customer?.pincode ?? '--'}
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
                    <div className="card border-r md:border-b-0 border-b border-border p-4 rounded-l-lg grid gap-2">
                        <p className="text-[12px] text-secondary-text">Last Visit</p>
                        {isPending ? (
                            <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-25 shadow" />
                        ) : (
                            <p>{customer && customer.lastVisit ? new Date(customer.lastVisit).toLocaleDateString() : '--'}</p>
                        )}
                    </div>
                    <div className="card border-r md:border-b-0 border-b border-border p-4 grid gap-2">
                        <p className="text-[12px] text-secondary-text">Total Orders</p>
                        {isPending ? (
                            <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-25 shadow" />
                        ) : (
                            <p className="">{customer?.orders?.length ?? '--'}</p>
                        )}

                    </div>
                    <div className="card border-r border-border p-4 grid gap-2">
                        <p className="text-[12px] text-secondary-text">Total Spent</p>
                        {isPending ? (
                            <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-25 shadow" />
                        ) : (
                            <p className="">₹{calculateOrderAmount(customer?.orders) ?? '--'}</p>
                        )}

                    </div>
                    <div className="card p-4 rounded-r-lg grid gap-2">
                        <p className="text-[12px] text-secondary-text">Preferred Contact</p>
                        {isPending ? (
                            <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-25 shadow" />
                        ) : (
                            <p className="">{customer?.phone ?? '--'}</p>
                        )}

                    </div>
                </div> 2 whitespace-nowrap
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
                            {isPending ? (
                                <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-25 shadow" />
                            ) : (
                                <p className="font-bold">{customer?.shirtSize ?? '--'}</p>
                            )}

                        </div>
                        <div className="card glass-card p-4 rounded-md grid gap-2">
                            <p className="text-secondary-text text-[12px]">T-Shirt Size</p>
                            {isPending ? (
                                <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-25 shadow" />
                            ) : (
                                <p className="font-bold">{customer?.tshirtSize ?? '--'}</p>
                            )}

                        </div>
                        <div className="card glass-card p-4 rounded-md grid gap-2">
                            <p className="text-secondary-text text-[12px]">Jeans Size</p>
                            {isPending ? (
                                <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-25 shadow" />
                            ) : (
                                <p className="font-bold">{customer?.jeansSize ?? '--'}</p>
                            )}

                        </div>
                        <div className="card glass-card p-4 rounded-md grid gap-2">
                            <p className="text-secondary-text text-[12px]">Jacket Size</p>
                            {isPending ? (
                                <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-25 shadow" />
                            ) : (
                                <p className="font-bold">{customer?.jacketSize ?? '--'}</p>
                            )}

                        </div>
                        <div className="card glass-card p-4 rounded-md grid gap-2">
                            <p className="text-secondary-text text-[12px]">Shoe Size</p>
                            {isPending ? (
                                <div className="bg-gray-200 h-4 mt-0.5 rounded-md w-25 shadow" />
                            ) : (
                                <p className="font-bold">{customer?.shoeSize ?? '--'}</p>
                            )}
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
                                <th className="md:p-4 p-2 whitespace-nowrap rounded-l-lg">#</th>
                                <th className="md:p-4 p-2 whitespace-nowrap ">Order ID</th>
                                <th className="md:p-4 p-2 whitespace-nowrap ">Date</th>
                                <th className="md:p-4 p-2 whitespace-nowrap ">Items</th>
                                <th className="md:p-4 p-2 whitespace-nowrap">Amount</th>
                                <th className="md:p-4 p-2 whitespace-nowrap rounded-r-lg">Receipt</th>
                            </thead>
                            <tbody>

                                {
                                    isPending ? (
                                        Array.from({ length: 5 }, (_, index) => {
                                            return <tr key={index} className="py-4 animate-pulse">
                                                <td className="py-4" colSpan={6}>
                                                    <div className="bg-gray-200 rounded-md h-4 w-full" />
                                                </td>
                                            </tr>
                                        })
                                    ) : error ? (
                                        <tr>
                                            <td colSpan={6} className="py-10 text-center">
                                                <span className="grid gap-2 w-full text-center text-xs">
                                                    <span>Unable to load today's stats</span>
                                                    <span>Something went wrong while fetching data!!</span>
                                                    <button onClick={fetchCustomer} disabled={isPending} className={
                                                        `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                                                    }>
                                                        {isPending ? 'Refetching...' : 'Try again'}
                                                    </button>
                                                </span>
                                            </td>
                                        </tr>
                                    ) :
                                        customer && (customer.orders?.length === 0 || !customer?.orders) ?
                                            (
                                                <tr>
                                                    <td colSpan={6} className="py-10">
                                                        <span className="grid gap-2 justify-center">
                                                            <span className="text-center">No Orders!!</span>
                                                            <span>
                                                                <Button children={
                                                                    <span className="flex gap-2 items-center">
                                                                        <FaCirclePlus />
                                                                        Create Order
                                                                    </span>
                                                                } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate(`/dashboard/orders/create-order/${id}`)} />
                                                            </span>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ) :
                                            customer?.orders?.map((item, key) => {
                                                return <tr key={item._id} className="text-xs">
                                                    <td className="md:p-4 p-2 py-4 border-b border-border">{key + 1}</td>
                                                    <td className="md:p-4 p-2 py-4 border-b border-border">{item.orderNumber}</td>
                                                    <td className="md:p-4 p-2 py-4 border-b border-border">{new Date(item.createdAt).toLocaleDateString()}</td>
                                                    <td className="md:p-4 p-2 py-4 border-b border-border">{
                                                        item.items.map(product => {
                                                            return <span>{product.productName}</span>
                                                        })
                                                    }</td>
                                                    <td className="md:p-4 p-2 py-4 border-b border-border">₹{item.totalAmount}</td>
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