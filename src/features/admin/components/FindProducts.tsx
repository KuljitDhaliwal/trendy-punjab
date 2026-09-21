import { IoSearch } from "react-icons/io5"


function FindProducts() {
    return (
        <div className="bg-orange-light/50 md:p-6 p-4 rounded-lg border-border relative">
            <div className="flex flex-wrap gap-4 justify-between items-start w-full">
                <div className="flex gap-2">
                    <div className="rounded-full p-2 bg-orange-light h-fit shadow">
                        <IoSearch />
                    </div>
                    <div>
                        <p>Find a Product</p>
                        <p className="text-[12px] text-secondary-text">Look up a product to see stock, sizes and price.</p>
                    </div>
                </div>
                <div className="flex gap-2 md:w-auto w-full items-center">
                    <div className="grid gap-2">
                        <input type="search" placeholder="Enter Product code or name"
                            className="border border-border rounded-lg bg-white px-4 py-2 md:w-80 w-full" />
                        {/* <p className={`text-[12px] text-red-500 transition-all duration-300 pointer-events-none ${phoneError ? 'opacity-100 flex' : 'hidden opacity-0'}`}>Please add phone number only</p> */}
                    </div>
                </div>
            </div>
            {/* {hasSearched && (
                <div className="absolute p-4 min-w-100 transition-all duration-300 min-h-30 rounded-lg shadow 
                bg-gray-200/90 tracking-wider right-10 top-20 grid place-items-center gap-4">
                    {findingCustomer ? (
                        <div className="text-sm w-full text-center">
                            Finding <div className="animate-ping">...</div>
                        </div>
                    ) : (
                        findCustomer && (findCustomer.length === 0 ? (
                            <div className="text-sm w-full absolute grid place-items-center inset-0 h-full">
                                Not Found!
                            </div>
                        ) :
                            (findCustomer.map((customer: Customer) => {
                                return <div key={customer._id}
                                    className="grid gap-2 p-2 w-full rounded-lg place-items-center ">
                                    <div className="flex justify-between w-full">
                                        <div className="text-sm flex gap-2 items-start">
                                            <div className="rounded-full p-2 bg-orange-dark text-white h-fit shadow">
                                                <p className="text-xl">{nameInitials(customer?.fullname ?? '')}</p>
                                            </div>
                                            <div>
                                                <div className="font-bold">{customer.fullname}</div>
                                                <div className="text-gray-500 flex items-center gap-2"><MdOutlinePhone /> {customer.phone}</div>
                                            </div>
                                        </div>
                                        <Button children={'View'} className="px-4 bg-orange-dark text-white"
                                            onClick={() => navigate(`/dashboard/customers/${customer._id}`)} />
                                    </div>
                                </div>
                            }))))}
                    <div className="absolute bg-gray-200/90 w-5 rotate-45 -top-2.5 h-5"></div>
                </div>
            )} */}
        </div>
    )
}

export default FindProducts