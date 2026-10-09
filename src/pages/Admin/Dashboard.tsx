
import { useEffect, useState } from "react"
import Admin from "../../features/admin/components/Admin"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import FindCustomers from "../../features/admin/components/FindCustomers"
import InventryAlert from "../../features/admin/components/InventryAlert"
import QuickActions from "../../features/admin/components/QuickActions"
import RecentCustomers from "../../features/admin/components/RecentCustomers"
import TodayActivity from "../../features/admin/components/TodayActivity"
import TodaySales from "../../features/admin/components/TodaySales"
import { useTodayDate } from "../../hooks/TodayDate"
import type { Customer } from "./Customers"
import { useFindCustomer } from "../../features/admin/api/admin.mutations"
import { useGetCustomers, useGetTodayStats } from "../../features/admin/api/admin.queries"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/Store"

function Dashboard() {
  const { date } = useTodayDate()
  const [phoneError, setPhoneError] = useState(false)
  const page = 1
  const [search, setSearch] = useState<string>('')
  const [hasSearched, setHasSearched] = useState(false)
  const [getCustomer, setGetCustomer] = useState<Customer[] | undefined>()
  const phoneRegex = /^[0-9]*$/
  const { mutate: findCustomerFun, isPending: findingCustomer } = useFindCustomer()
  const { data: todayStats,
    isLoading: todayStatsLoading,
    error: todayStatsError,
    refetch: refetchTodayStats,
    isFetching: isFetchingTodayStats,
    isFetched: todayStatsFetched,
  } = useGetTodayStats()
  //Get customers
  const { data: customerData, 
    isLoading: customerLoading, 
    error: customerError,
    isFetching: customerIsFetching,
    isFetched: customerIsFetched,
    refetch: customerRefetched } = useGetCustomers(page, 10)
  const admin = useSelector((state: RootState) => state.auth.admin)

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

  return (
    <div className="grid gap-6">
      <AdminPagesHeader first={date} main={'Dashboard'}
        third={<span className="flex gap-1 md:flex-row flex-col items-center">Good Morning, <span className="tracking-wider">{admin?.fullname !== '' ? admin?.fullname : (
          <div className="w-28 h-4 bg-gray-200 rounded-md animate-pulse"></div>
        )}</span></span>} right={<Admin show={true} fullname={admin?.fullname} role={admin?.role} />} />


      <FindCustomers phoneError={phoneError}
        hasSearched={hasSearched}
        findingCustomer={findingCustomer}
        findCustomer={getCustomer}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => findCustomer(e)} />


      <TodayActivity
        todayStatsLoading={todayStatsLoading}
        todayStats={todayStats?.stats}
        todayStatsError={todayStatsError}
        refetchTodayStats={refetchTodayStats}
        isFetchingTodayStats={isFetchingTodayStats}
        todayStatsFetched={todayStatsFetched}
      />


      <div className="grid md:grid-cols-[1.5fr_1fr] gap-4">
        <TodaySales
          todayOrders={todayStats?.stats}
          todayStatsLoading={todayStatsLoading}
          todayStatsError={todayStatsError}
          refetchTodayStats={refetchTodayStats}
          isFetchingTodayStats={isFetchingTodayStats}
          todayStatsFetched={todayStatsFetched} />

        <InventryAlert todayOrders={todayStats?.stats}
          todayStatsLoading={todayStatsLoading}
          todayStatsError={todayStatsError}
          refetchTodayStats={refetchTodayStats}
          isFetchingTodayStats={isFetchingTodayStats}
          todayStatsFetched={todayStatsFetched} />
      </div>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-4">
        <RecentCustomers
          customerData={customerData?.customers}
          customerLoading={customerLoading}
          customerError={customerError}
          customerIsFetching={customerIsFetching}
          customerIsFetched={customerIsFetched}
          customerRefetched={customerRefetched}
           />
        <QuickActions />
      </div>
    </div>
  )
}

export default Dashboard