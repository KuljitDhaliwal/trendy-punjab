import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import { useGetOrders, useGetOrdersStats } from "../../features/admin/api/admin.queries"
import { useEffect, useState } from "react"
import StatsCard from "../../features/admin/components/StatsCard"
import Pagination from "../../components/Pagination"
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
  const {data: orderStats, isLoading: orderStatsLoading, error: orderStatsError} = useGetOrdersStats()
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



  //Handle Find Order
  const handleFindOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  console.log('Order stats', ordersStats)

  return (
    <div className="grid gap-6">
      <AdminPagesHeader first={'Orders Management'}
        main={'Orders'} third={'Manage customer orders, payments and billing.'}
        right={('')} />

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {orderStats && orderStats.stats.map((item: OrderStatsType, key: number) => {
          return <StatsCard item={item} key={key}/>
        })}
      </div>


      <FindOrder handleFindOrder={handleFindOrder} />


      {/* All Products */}
      <div className="p-4 glass-card grid gap-4">
        <div className="flex md:flex-row gap-4 flex-col justify-between">
          <div className="grid gap-2">
            <p className="font-bold">All Orders</p>
            <p className="text-[12px] text-secondary-text">{data?.pagination?.totalOrders} order records</p>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table-auto min-w-120 w-full">
            <thead className="text-left text-white text-[12px] bg-orange-dark uppercase">
              <tr>
                <th className="p-4 rounded-l-lg">#</th>
                <th className="p-4">customer</th>
                <th className="p-4">items</th>
                <th className="p-4">total amount</th>
                <th className="p-4">payment</th>
                <th className="p-4">payment status</th>
                <th className="p-4">date</th>
                <th className="p-4 rounded-r-lg">action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center">
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
                    <td className="p-3">{(Number(page) - 1) * limit + key + 1}</td>
                    <td className="p-4">{item.customerId.fullname}</td>
                    <td className="p-4">{item.items.length}</td>
                    <td className="p-4">₹{item.totalAmount}</td>
                    <td className="p-4">{item.paymentMethod}</td>
                    <td className="p-4">
                      <span className="bg-green-600 px-2 py-1 text-white rounded-lg">
                        {item.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="fl4x gap-4 items-center p-4">
                      <button type="button" className="bg-orange-dark text-white py-1 px-2 active:scale-95 rounded-md cursor-pointer"
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