import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import { useGetOrders } from "../../features/admin/api/admin.queries"
import { useEffect, useState } from "react"
import StatsCard, { type ProductStatsType } from "../../features/admin/components/StatsCard"
import Pagination from "../../components/Pagination"
import FindProducts from "../../features/admin/components/FindProducts"
import FindOrder from "../../features/admin/components/FindOrder"


type OrderStatsType = {
  label: string,
  value: number
}

function Orders() {
  const [ordersStats, setOrdersStats] = useState<OrderStatsType[]>([])
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [search, setSearch] = useState<string | number>("")
  const { data, isLoading, error } = useGetOrders({ page, limit, search })

  const navigate = useNavigate()

  //handleViewCustomer
  const handleViewOrder = (orderID: string) => {
    navigate(`/dashboard/orders/order/${orderID}`)
  }

  useEffect(() => {
    if (!data?.orders) return
    let totalOrders = data?.orders?.length
    let completedOrders = data?.orders?.map((item: any) => {
      if (item.paymentStatus === 'Paid') {
        return item
      }
    })

    setOrdersStats([
      {
        label: 'Total Orders',
        value: totalOrders,
      },
      {
        label: 'Completed',
        value: completedOrders.length,
      }
    ])
  }, [data])


  //Handle Page
  const handlePage = (currentPage: number) => {
    console.log('CurrentPage', currentPage)
    setPage(currentPage)
  }
  console.log('Page', page)



  //Handle Find Order
  const handleFindOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }


  return (
    <div className="grid gap-6">
      <AdminPagesHeader first={'Orders Management'}
        main={'Orders'} third={'Manage customer orders, payments and billing.'}
        right={('')} />

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {ordersStats.map((item: OrderStatsType) => {
          return <StatsCard item={item} />
        })}
      </div>


      <FindOrder handleFindOrder={handleFindOrder} />


      {/* All Products */}
      <div className="bg-orange-light p-4 rounded-lg shadow grid gap-4">
        <div className="flex md:flex-row gap-4 flex-col justify-between">
          <div className="grid gap-2">
            <p className="font-bold">All Orders</p>
            <p className="text-[12px] text-secondary-text">1248 order records</p>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="text-xs table-auto min-w-200 w-full">
            <thead className="text-left text-secondary-text uppercase text-[12px]">
              <tr>
                <th>#</th>
                <th>customer</th>
                <th>items</th>
                <th>total amount</th>
                <th>payment</th>
                <th>payment status</th>
                <th>date</th>
                <th>action</th>
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
              ) : data && data?.pagination?.orders?.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <span className="grid gap-2 py-10">
                      <p className="text-center">No Order! Please add</p>
                      <Button children={'+ Add Order'} onClick={() => navigate('/dashboard/customers/')}
                        className="text-[12px] px-4 py-2 block w-fit m-auto bg-orange-dark text-white" />
                    </span>
                  </td>
                </tr>
              ) :
                data?.pagination?.orders?.map((item: any, key: number) => {
                  return <tr key={item._id} className="py-2 border-b border-secondary-text/20">
                    <td className="py-3">{(Number(page) - 1) * limit + key + 1}</td>
                    <td className="py-3">{item.customerId.fullname}</td>
                    <td className="py-3">{item.items.length}</td>
                    <td className="py-3">₹{item.totalAmount}</td>
                    <td className="py-3">{item.paymentMethod}</td>
                    <td className="py-3">{item.paymentStatus}</td>
                    <td className="py-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="flex gap-4 items-center py-3">
                      <button type="button" className="underline cursor-pointer"
                        onClick={() => handleViewOrder(item._id)}>View</button>
                    </td>
                  </tr>
                })}
            </tbody>
          </table>
        </div>
        {data?.pagination?.orders?.length > 0 && (
          <Pagination pagination={data?.pagination} onClick={handlePage} />
        )}
      </div>
    </div>
  )
}

export default Orders