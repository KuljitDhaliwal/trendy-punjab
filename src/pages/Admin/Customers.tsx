import { useEffect, useState } from "react"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import FindCustomers from "../../features/admin/components/FindCustomers"
import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import { useGetCustomers, useGetCustomersStats } from "../../features/admin/api/admin.queries"
import Pagination from "../../components/Pagination"
import { useFindCustomer } from "../../features/admin/api/admin.mutations"
import StatsCard from "../../features/admin/components/StatsCard"
import { calculateOrderAmount } from "../../utils/CalculateTotal"
import SkeletonCard from "../../components/ui/SkeletonCard"
import { FaCirclePlus } from "react-icons/fa6"






export type OrderItem = {
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

export type Order = {
  _id: string
  customerId: string
  items: OrderItem[]
  subtotal: number
  discount: number
  totalAmount: number
  paymentMethod: "Cash" | "UPI" | "Card" | "Other"
  paymentStatus: "Pending" | "Paid" | "Partially Paid" | "Refunded"
  orderStatus: "Pending" | "Completed" | "Cancelled" | "Returned"
  notes: string
  createdAt: Date
  updatedAt: Date,
  orderNumber: string
}


export type Customer = {
  _id: string,
  fullname: string
  phone: string
  email: string
  address: string,
  city: string,
  state: string,
  pincode: string,

  shirtSize: string
  shirtFit: string,
  tshirtSize: string,
  jeansSize: string,
  jeansFit: string,
  jacketSize: string
  shoeSize: string

  notes: string

  lastVisit: Date,
  orders: Order[],
  totalSpent: number,
  createdAt: Date
}






export type CustomerStats = {
  label: string,
  value: number
}


export type PaginationType = {
  currentPage: number,
  limit: number,
  totalCustomers: number,
  totalPages: number
}

function Customers() {

  const [getCustomer, setGetCustomer] = useState<Customer[] | undefined>()
  const [phoneError, setPhoneError] = useState(false)
  const [search, setSearch] = useState<string>('')
  const limit = 10
  const [hasSearched, setHasSearched] = useState(false)
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const phoneRegex = /^[0-9]*$/
  //Get customers
  const { data, isLoading, error, refetch, isFetched, isFetching } = useGetCustomers(page, limit)
  console.log('Customer Page', data?.customers)
  //Get customers stats
  const {
    data: customerStatsData,
    isLoading: customerStatsIsLoading,
    error: customerStatsError,
    refetch: customerStatsRefetch,
    isFetched: customerStatsRefetched,
    isFetching: customerStatsRefetching } = useGetCustomersStats()

  //Find Customer
  const { mutate: findCustomerFun, isPending: findingCustomer } = useFindCustomer()
  useEffect(() => {
    if (!hasSearched) return
    if (search.length <= 3) return
    findCustomerFun(search, {
      onSuccess: (data) => {
        setGetCustomer(data.customer)
        console.log('Success', data.customer)
        setGetCustomer(data.customer)
      },
      onError: () => {
        console.log('Somethinf went wrong!')
      }
    })
  }, [search])


  //Handle Find Customer
  const findCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!phoneRegex.test(value)) {
      console.log('Runnnn')
      setPhoneError(true)
      return
    }
    setPhoneError(false)
    setSearch(value)
    if (!value.trim()) {
      setGetCustomer(undefined)
      setHasSearched(false)
      return
    }
    if (value.length <= 3) return
    setHasSearched(true)
  }


  //Handle Page
  const handlePage = (pageNumber: number) => {
    setPage(pageNumber)
  }


  //Handle View Customer
  const handleViewCustomer = (customerID: string) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    navigate(`/dashboard/customers/${customerID}`)
  }




  return (
    <div className="grid gap-6">
      <AdminPagesHeader first={'Customer records'}
        main={'Customers'} third={'Manage customer information, sizes, measurements and order history.'}
        right={(
          <Button children={<span className="flex gap-2 items-center">
            <FaCirclePlus/>
            Add Customer
          </span>} onClick={() => navigate('add-customer')}
            className="text-[12px] px-4 py-2 bg-orange-dark text-white" />
        )} />

      <div>
        {customerStatsIsLoading && !customerStatsRefetched ? (
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
            {Array.from({ length: 2 }, () => {
              return <SkeletonCard />
            })}
          </div>
        ) : customerStatsError || (customerStatsRefetching && !customerStatsData) ? (
          <div className="w-full p-4 glass-card grid place-items-center">
            <span className="grid gap-2 w-full text-center text-xs">
              <span>Unable to load customer's stats</span>
              <span>Something went wrong while fetching data!!</span>
              <button onClick={() => customerStatsRefetch()} disabled={customerStatsRefetching} className={
                `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
              }>
                {customerStatsRefetching ? 'Refetching...' : 'Try again'}
              </button>
            </span>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
            {customerStatsData?.customerStats?.map((item: CustomerStats) => {
              return <StatsCard item={item} />
            })}
          </div>
        )}
      </div>

      <FindCustomers phoneError={phoneError}
        hasSearched={hasSearched}
        findingCustomer={findingCustomer}
        findCustomer={getCustomer}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => findCustomer(e)} />

      <div className="p-4 glass-card grid gap-4">
        <div className="flex md:flex-row gap-4 flex-col justify-between">
          <div className="grid gap-2">
            <p className="font-bold">All Customers</p>
            {isLoading ? (
              <div className="h-3 w-22 rounded-md bg-gray-200 animate-pulse" />
            ) : (
              <p className="text-[12px] text-secondary-text">{data?.pagination.totalCustomers} customer records</p>
            )}
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table-auto min-w-120 w-full">
            <thead className="text-left rounded-lg text-white uppercase text-[12px]">
              <tr className="bg-orange-dark p-4">
                <th className="md:p-4 p-2 rounded-l-lg">#</th>
                <th className="md:p-4 p-2">customer</th>
                <th className="md:p-4 p-2">phone</th>
                <th className="md:p-4 p-2 whitespace-nowrap">last visit</th>
                <th className="md:p-4 p-2">orders</th>
                <th className="md:p-4 p-2 whitespace-nowrap">total spent</th>
                <th className="md:p-4 p-2 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {isLoading && !isFetched ? (
                Array.from({ length: 10 }, (_, index) => {
                  return <tr key={index} className="animate-pulse py-4">
                    <td className="py-4" colSpan={7}>
                      <div className="bg-gray-200 h-4 rounded-md w-full" />
                    </td>
                  </tr>
                })
              ) : error || (isFetching && !data) ? (
                <tr className="w-full">
                  <td colSpan={7} className="py-10">
                    <span className="grid gap-2 w-full text-center text-xs">
                      <span>Unable to load today's stats</span>
                      <span>Something went wrong while fetching data!!</span>
                      <button onClick={() => refetch()} disabled={isFetching} className={
                        `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                      }>
                        {isFetching ? 'Refetching...' : 'Try again'}
                      </button>
                    </span>
                  </td>
                </tr>
              ) : data && data.customers.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <span className="grid gap-2 py-10">
                      <p className="text-center">No customer! Please add</p>
                      <Button children={'+ Add Customer'} onClick={() => navigate('add-customer')}
                        className="text-[12px] px-4 py-2 block w-fit m-auto bg-orange-dark text-white" />
                    </span>
                  </td>
                </tr>
              ) :
                data.customers.map((item: Customer, key: number) => {
                  return <tr key={item._id} className="p-4 border-b border-border">
                    <td className="md:p-4 p-2 py-4">{(page - 1) * limit + key + 1}</td>
                    <td className="md:p-4 p-2 py-4">{item.fullname}</td>
                    <td className="md:p-4 p-2 py-4">{item.phone}</td>
                    <td className="md:p-4 p-2 py-4">{item.lastVisit ? new Date(item.lastVisit).toLocaleDateString() : '--'}</td>
                    <td className="md:p-4 p-2 py-4">{item.orders?.length ?? '--'}</td>
                    <td className="md:p-4 p-2 py-4">₹{calculateOrderAmount(item.orders)}</td>
                    <td className="md:p-4 p-2 py-4">
                      <button type="button" className="bg-orange-dark text-white py-1 px-2 active:scale-95 rounded-md cursor-pointer"
                        onClick={() => handleViewCustomer(item._id)}>
                        View
                      </button>
                    </td>
                  </tr>
                })}
            </tbody>
          </table>
        </div>
        {data?.customers?.length > 0 && !error && (
          <Pagination onClick={handlePage} pagination={data?.pagination} />
        )}
      </div>
    </div >
  )
}

export default Customers