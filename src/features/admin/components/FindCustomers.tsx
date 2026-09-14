import { IoSearch } from "react-icons/io5";
import Button from "../../../components/ui/Button";

function FindCustomers() {
  return (
    <div className="bg-orange-light/50 md:p-6 p-4 rounded-lg border-border">
        <div className="flex flex-wrap gap-4 justify-between items-center w-full">
            <div className="flex gap-2">
                <div className="rounded-full p-2 bg-orange-light h-fit shadow">
                    <IoSearch/>
                </div>
                <div>
                    <p>Find a Customer</p>
                    <p className="text-[12px] text-secondary-text">Look up a phone number to see saved measurements and order history.</p>
                </div>
            </div>
            <div className="flex gap-2 md:w-auto w-full items-center">
                <input type="search" placeholder="Enter Phone Number"
                className="border border-border rounded-lg bg-white px-4 py-2 md:w-auto w-full"/>
                <Button children={'Find Customers'} className={`px-2 py-2 text-[12px]
                bg-orange-dark text-white`}/>
            </div>
        </div>
    </div>
  )
}

export default FindCustomers