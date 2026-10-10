import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import { useGetOrders, useGetOrdersStats } from "../../features/admin/api/admin.queries"
import { useState } from "react"
import StatsCard from "../../features/admin/components/StatsCard"
import Pagination from "../../components/Pagination"
import FindOrder from "../../features/admin/components/FindOrder"
import SkeletonCard from "../../components/ui/SkeletonCard"
import type { OrderType } from "../../types/Order"
import { FaCirclePlus } from "react-icons/fa6"


type OrderStatsType = {
  label: string,
  value: number
}

function Orders() {
  const [page, setPage] = useState<number>(1)
  const limit = 10
  const [search, setSearch] = useState<string | number>("")
  const { data, isLoading, error, isFetched, isFetching, refetch } = useGetOrders({ page, limit, search })
  const { data: orderStats, isLoading: orderStatsLoading,
    error: orderStatsError,
    isFetched: orderStatsIsFetched,
    isFetching: orderStatsIsFetching,
    refetch: orderStatsRefetch } = useGetOrdersStats()
  const navigate = useNavigate()

  //handleViewCustomer
  const handleViewOrder = (orderID: string) => {
    navigate(`/dashboard/orders/order/${orderID}`)
  }




  //Handle Page
  const handlePage = (currentPage: number) => {

    setPage(currentPage)
  }



  //Handle Find Order
  const handleFindOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }


  return (
    <div className="grid gap-6">
      <AdminPagesHeader first={'Orders Management'}
        main={'Orders'} third={'Manage customer orders, payments and billing and create new order.'}
        right={(
          <Button children={
            <span className="flex gap-2 items-center">
              <FaCirclePlus />
              Add Order
            </span>
          } onClick={() => navigate('/dashboard/customers')}
            className="text-[12px] px-4 py-2 bg-orange-dark text-white" />
        )} />


      <div>
        {orderStatsLoading && !orderStatsIsFetched ? (
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
            {Array.from({ length: 3 }, (_,index) => {
              return <SkeletonCard key={index}/>
            })}
          </div>
        ) : orderStatsError || (orderStatsIsFetching && !orderStats) ? (
          <div className="w-full p-4 glass-card grid place-items-center">
            <span className="grid gap-2 w-full text-center text-xs">
              <span>Unable to load order's stats</span>
              <span>Something went wrong while fetching data!!</span>
              <button onClick={() => orderStatsRefetch()} disabled={orderStatsIsFetching} className={
                `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
              }>
                {orderStatsIsFetching ? 'Refetching...' : 'Try again'}
              </button>
            </span>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">

            {orderStats?.stats?.map((item: OrderStatsType, key: number) => {
              return <StatsCard item={item} key={key} />
            })}
          </div>
        )}
      </div>



      <FindOrder handleFindOrder={handleFindOrder} />


      {/* All Products */}
      <div className="p-4 glass-card grid gap-4">
        <div className="flex md:flex-row gap-4 flex-col justify-between">
          <div className="grid gap-2">
            <p className="font-bold">All Orders</p>
            {isLoading ? (
              <div className="h-3 w-22 rounded-md bg-gray-200 animate-pulse" />
            ) : (
              <p className="text-[12px] text-secondary-text">{data?.pagination?.totalOrders} order records</p>
            )}
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table-auto min-w-120 w-full">
            <thead className="text-left text-white text-[12px] bg-orange-dark uppercase">
              <tr>
                <th className="md:p-4 p-2 whitespace-nowrap rounded-l-lg">#</th>
                <th className="md:p-4 p-2 whitespace-nowrap">customer</th>
                <th className="md:p-4 p-2 whitespace-nowrap">items</th>
                <th className="md:p-4 p-2 whitespace-nowrap">total amount</th>
                <th className="md:p-4 p-2 whitespace-nowrap">payment</th>
                <th className="md:p-4 p-2 whitespace-nowrap">payment status</th>
                <th className="md:p-4 p-2 whitespace-nowrap">date</th>
                <th className="md:p-4 p-2 whitespace-nowrap rounded-r-lg">action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {isLoading && !isFetched ? (
                Array.from({ length: 10 }, (_, index) => {
                  return <tr key={index} className="py-4 animate-pulse">
                    <td className="py-4" colSpan={8}>
                      <div className="bg-gray-200 rounded-md h-4 w-full" />
                    </td>
                  </tr>
                })
              ) : error || (isFetching && !data) ? (
                <tr className="w-full">
                  <td colSpan={8} className="py-10">
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
              ) : data && data?.pagination?.orders?.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <span className="grid gap-2 py-10">
                      <p className="text-center">No Order! Please add</p>
                      <Button children={'+ Add Order'} onClick={() => navigate('/dashboard/customers/')}
                        className="text-[12px] px-4 py-2 block w-fit m-auto bg-orange-dark text-white" />
                    </span>
                  </td>
                </tr>
              ) :
                data?.pagination?.orders?.map((item: OrderType, key: number) => {
                  return <tr key={item._id} className="py-2 border-b border-secondary-text/20">
                    <td className="md:p-4 p-2 py-4">{(Number(page) - 1) * limit + key + 1}</td>
                    <td className="md:p-4 p-2 py-4">{item.customerId?.fullname}</td>
                    <td className="md:p-4 p-2 py-4">{item.items.length}</td>
                    <td className="md:p-4 p-2 py-4">₹{item.totalAmount}</td>
                    <td className="md:p-4 p-2 py-4">{item.paymentMethod}</td>
                    <td className="md:p-4 p-2 py-4">
                      <span className="bg-green-600 px-2 py-1 text-white rounded-lg">
                        {item.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">{new Date(item.createdAt ?? '').toLocaleDateString()}</td>
                    <td className="fl4x gap-4 items-center p-4">
                      <button type="button" className="bg-orange-dark text-white py-1 px-2 active:scale-95 rounded-md cursor-pointer"
                        onClick={() => handleViewOrder(item._id ?? '')}>View</button>
                    </td>
                  </tr>
                })}
            </tbody>
          </table>
        </div>
        {data?.pagination?.orders?.length > 0 && !error && (
          <Pagination pagination={data?.pagination} onClick={handlePage} />
        )}
      </div>
    </div>
  )
}

export default Orders