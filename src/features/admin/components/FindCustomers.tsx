import { IoSearch } from "react-icons/io5";
import type { Customer } from "../../../pages/Admin/Customers";
import { useNavigate } from "react-router-dom";
import { MdOutlinePhone } from "react-icons/md";
import { nameInitials } from "../../../utils/NameInitials";
import Button from "../../../components/ui/Button";

interface FindCustomersProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    findCustomer: Customer[] | undefined,
    hasSearched: boolean,
    findingCustomer: boolean,
    phoneError: boolean
}


function FindCustomers({ onChange, findCustomer, hasSearched, findingCustomer, phoneError }: FindCustomersProps) {
    const navigate = useNavigate()
    console.log('Phone Error', phoneError)
    return (
        <div className="relative">
            <div className="glass-card md:p-6 p-4">
                <div className="grid lg:grid-cols-2 gap-4 items-start w-full">
                    <div className="flex gap-2">
                        <div className="rounded-full p-2 bg-orange-light h-fit shadow">
                            <IoSearch />
                        </div>
                        <div>
                            <p>Find a Customer</p>
                            <p className="text-[12px] text-secondary-text">Look up a phone number to see customer details.</p>
                        </div>
                    </div>
                    <div className="flex gap-2 md:w-auto w-full items-center">
                        <div className="grid gap-2 w-full">
                            <input type="search" placeholder="Enter Phone Number"
                                inputMode="numeric"
                                maxLength={10}
                                onChange={onChange}
                                className="border border-border rounded-lg bg-white px-4 py-2 w-full" />
                            <p className={`text-[12px] text-red-500 transition-all duration-300 pointer-events-none ${phoneError ? 'opacity-100 flex' : 'hidden opacity-0'}`}>Please add phone number only</p>
                        </div>
                    </div>
                </div>

                {/* {findCustomer ? (
                    <button onClick={() => navigate(`/dashboard/customers/${findCustomer._id}`)}
                        className="absolute p-4 rounded-lg cursor-pointer shadow bg-orange-dark text-white tracking-wider right-40 -bottom-20">
                        <div className="grid justify-start gap-2">
                            <div className="text-sm">{findCustomer.fullname}</div>
                            <div className="text-sm">Phone: {findCustomer.phone}</div>
                        </div>
                        <div className="absolute bg-orange-dark w-5 rotate-45 -top-2.5 h-5"></div>
                    </button>

                ) : (
                    <div className="absolute p-4 rounded-lg shadow bg-gray-200 tracking-wider right-40 -bottom-10">
                        <div className="grid justify-start gap-2">
                            <div className="text-sm">Not found!</div>
                        </div>
                        <div className="absolute bg-gray-200 w-5 rotate-45 -top-2.5 h-5"></div>
                    </div>
                )} */}
            </div>
            {hasSearched && (
                <div className="absolute p-4 z-10 transition-all duration-300 rounded-lg shadow 
                    bg-white min-w-100 min-h-30 tracking-wider right-10 grid place-items-center gap-4">
                    {findingCustomer ? (
                        <div className="text-xs absolute w-full grid place-items-center inset-0">
                            Finding....
                        </div>
                    ) : (
                        findCustomer && (findCustomer.length === 0 ? (
                            <div className="text-xs absolute w-full grid place-items-center inset-0">
                                <div className="grid items-center justify-center text-center gap-2">
                                    Not Found!
                                    <Button children={'+ Add Customer'} onClick={() => navigate('/dashboard/customers/add-customer')}
                                                        className="text-[12px] px-4 py-2 block w-fit m-auto bg-orange-dark text-white" />
                                </div>
                            </div>
                        ) :
                            (findCustomer.map((customer: Customer) => {
                                return <div key={customer._id}
                                    className="grid gap-2 p-2 w-full rounded-lg place-items-center ">
                                    <div className="grid w-full gap-4">
                                        <div className="text-sm flex gap-2 items-start">
                                            <div className="rounded-full p-2 bg-orange-dark text-white h-fit shadow">
                                                <p className="text-xl">{nameInitials(customer?.fullname ?? '')}</p>
                                            </div>
                                            <div>
                                                <div className="font-bold">{customer.fullname}</div>
                                                <div className="text-gray-500 flex items-center gap-2"><MdOutlinePhone /> {customer.phone}</div>
                                            </div>
                                        </div>
                                        <Button children={'View'} className="px-4 py-2 block bg-orange-dark text-xs text-white"
                                            onClick={() => navigate(`/dashboard/customers/${customer._id}`)} />
                                    </div>
                                </div>
                            }))))}
                    <div className="absolute bg-white w-5 rotate-45 -top-2.5 h-5"></div>
                </div>
            )}
        </div>
    )
}

export default FindCustomers