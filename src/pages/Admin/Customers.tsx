import { useEffect, useState } from "react"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import FindCustomers from "../../features/admin/components/FindCustomers"
import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import { useGetCustomers, useGetCustomersStats } from "../../features/admin/api/admin.queries"
import Pagination from "../../components/Pagination"
import { useFindCustomer } from "../../features/admin/api/admin.mutations"
import StatsCard from "../../features/admin/components/StatsCard"






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
  updatedAt: Date
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
  const [hasSearched, setHasSearched] = useState(false)
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const phoneRegex = /^[0-9]*$/
  //Get customers
  const { data, isLoading, error } = useGetCustomers(page, 10)

  //Get customers stats
  const {
    data: customerStatsData,
    isLoading: customerStatsIsLoading,
    error: customerStatsError } = useGetCustomersStats()

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
          <Button children={'+ Add Customer'} onClick={() => navigate('add-customer')}
            className="text-[12px] px-4 py-2 bg-orange-dark text-white" />
        )} />

      {customerStatsIsLoading ? (<div className="bg-orange-light w-full rounded-lg shadow p-4 h-20 grid place-items-center">
        <p>Loading...</p>
      </div>) : customerStatsError ? (
        <div className="bg-orange-light w-full rounded-lg shadow p-4 h-20 grid place-items-center">
          <p>Something went wrong</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {customerStatsData && customerStatsData.customerStats.map((item: CustomerStats) => {
            return <StatsCard item={item} />
          })}
        </div>
      )}

      <FindCustomers phoneError={phoneError}
        hasSearched={hasSearched}
        findingCustomer={findingCustomer}
        findCustomer={getCustomer}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => findCustomer(e)} />

      <div className="bg-orange-light p-4 rounded-lg shadow grid gap-4">
        <div className="flex md:flex-row gap-4 flex-col justify-between">
          <div className="grid gap-2">
            <p className="font-bold">All Customers</p>
            <p className="text-[12px] text-secondary-text">1248 customer records</p>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="text-sm table-auto min-w-200 w-full">
            <thead className="text-left text-secondary-text uppercase text-[12px]">
              <tr>
                <th>customer</th>
                <th>phone</th>
                <th>sizes</th>
                <th>last visit</th>
                <th>orders</th>
                <th>total spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-10">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="py-10">
                    Something error
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
                data.customers.map((item: Customer) => {
                  return <tr key={item._id} className="py-2 border-b border-secondary-text/20">
                    <td className="py-3">{item.fullname}</td>
                    <td className="py-3">{item.phone}</td>
                    <td className="py-3">
                      {(!item.shirtSize && !item.jeansSize) ? '--' : (
                        <>
                          {item.shirtSize && `Shirt: ${item.shirtSize}`}
                          {item.shirtSize && item.jeansSize && " | "}
                          {item.jeansSize && `Jeans: ${item.jeansSize}`}
                        </>
                      )}
                    </td>
                    <td className="py-3">{item.lastVisit ? new Date(item.lastVisit).toLocaleDateString() : '--'}</td>
                    <td className="py-3">{item.orders?.length ?? '--'}</td>
                    <td className="py-3">{item.totalSpent ?? '--'}</td>
                    <td><button type="button" className="underline cursor-pointer"
                      onClick={()=> handleViewCustomer(item._id) }>View</button></td>
                  </tr>
                })}
            </tbody>
          </table>
        </div>
        <Pagination onClick={handlePage} pagination={data?.pagination} />
      </div>
    </div >
  )
}

export default Customers