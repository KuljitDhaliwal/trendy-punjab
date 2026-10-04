import { IoSearch } from "react-icons/io5"

type FindOrderType = {
    handleFindOrder: React.ChangeEventHandler
}

function FindOrder({handleFindOrder}: FindOrderType) {
    return (
        <div className="glass-card md:p-6 p-4 relative">
            <div className="flex flex-wrap gap-4 justify-between items-start w-full">
                <div className="flex gap-2">
                    <div className="rounded-full p-2 bg-orange-dark text-white h-fit shadow">
                        <IoSearch />
                    </div>
                    <div>
                        <p>Find a Order</p>
                        <p className="text-[12px] text-secondary-text">Look up a order of customer.</p>
                    </div>
                </div>
                <div className="flex gap-2 md:w-auto w-full items-center">
                    <div className="grid gap-2 w-full">
                        <input type="search" placeholder="Enter Product code or name" onChange={handleFindOrder}
                            className="border border-border rounded-lg bg-white px-4 py-2 md:w-80 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindOrder