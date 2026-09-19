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

function CustomerDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { mutate: getCustomer } = useGetCustomer()
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


    console.log('Customer Details', customer)



    const handleEditCustomer = () => {
        navigate(`/dashboard/customers/edit-customer/${id}`)
    }

    const handleCancel = () => {

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
            <section className="rounded-lg bg-orange-light/50 p-4 flex justify-between items-start">
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
                    } className="text-[12px] px-4 py-2 bg-orange-dark text-white" onClick={() => navigate('/dashboard/customers')} />
                </div>
            </section>

            {customer && customer.notes && (
                <section className="rounded-lg bg-orange-light/50 p-4 flex justify-between items-start">
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


            {/* Customer's Stats */}
            <section className="grid gap-6">
                <div className="grid gap-2">
                    <p className="font-bold">Customer Overview</p>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 bg-orange-light justify-between items-center">
                    <div className="card border border-border p-4 rounded-l-lg">
                        <p className="text-[12px] text-secondary-text">Last Visit</p>
                        <p className="font-bold">{customer && customer.lastVisit ? new Date(customer.lastVisit).toLocaleDateString() : '--'}</p>
                    </div>
                    <div className="card border border-border p-4">
                        <p className="text-[12px] text-secondary-text">Total Orders</p>
                        <p className="font-bold">{customer?.orders?.length ?? '--'}</p>
                    </div>
                    <div className="card border border-border p-4">
                        <p className="text-[12px] text-secondary-text">Total Spent</p>
                        <p className="font-bold">{customer?.totalSpent ?? '--'}</p>
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
                            <p className="font-bold">{customer?.shirtSize ?? '--'}</p>
                        </div>
                        <div className="card bg-white p-4 rounded-md">
                            <p className="text-secondary-text text-[12px]">T-Shirt Size</p>
                            <p className="font-bold">{customer?.tshirtSize ?? '--'}</p>
                        </div>
                        <div className="card bg-white p-4 rounded-md">
                            <p className="text-secondary-text text-[12px]">Jeans Size</p>
                            <p className="font-bold">{customer?.jeansSize ?? '--'}</p>
                        </div>
                        <div className="card bg-white p-4 rounded-md">
                            <p className="text-secondary-text text-[12px]">Jacket Size</p>
                            <p className="font-bold">{customer?.jacketSize ?? '--'}</p>
                        </div>
                        <div className="card bg-white p-4 rounded-md">
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
                    <div>
                        <table className="w-full">
                            <thead className="text-left text-secondary-text">
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Amount</th>
                            </thead>
                            <tbody>
                                {customer && (customer.orders?.length === 0 || !customer?.orders) ?
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
                                        customer?.orders?.map(item => {
                                        return <tr key={item._id} className="py-2">
                                            <td className="py-2 border-b border-border">{item._id}</td>
                                            <td className="py-2 border-b border-border">{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td className="py-2 border-b border-border">{
                                                item.items.map(product => {
                                                    return <span>{product.productName}</span>
                                                })    
                                            }</td>
                                            <td className="py-2 border-b border-border">{item.subtotal}</td>
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