import { IoSearch } from "react-icons/io5"

type FindOrderType = {
    handleFindOrder: React.ChangeEventHandler
}

function FindOrder({handleFindOrder}: FindOrderType) {
    return (
        <div className="bg-orange-light/50 md:p-6 p-4 rounded-lg border-border relative">
            <div className="flex flex-wrap gap-4 justify-between items-start w-full">
                <div className="flex gap-2">
                    <div className="rounded-full p-2 bg-orange-light h-fit shadow">
                        <IoSearch />
                    </div>
                    <div>
                        <p>Find a Order</p>
                        <p className="text-[12px] text-secondary-text">Look up a order of customer.</p>
                    </div>
                </div>
                <div className="flex gap-2 md:w-auto w-full items-center">
                    <div className="grid gap-2">
                        <input type="search" placeholder="Enter Product code or name" onChange={handleFindOrder}
                            className="border border-border rounded-lg bg-white px-4 py-2 md:w-80 w-full" />
                        {/* <p className={`text-[12px] text-red-500 transition-all duration-300 pointer-events-none ${phoneError ? 'opacity-100 flex' : 'hidden opacity-0'}`}>Please add phone number only</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindOrder