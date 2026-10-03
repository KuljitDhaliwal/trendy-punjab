
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
import { useGetTodayStats } from "../../features/admin/api/admin.queries"

function Dashboard() {
  const { date } = useTodayDate()
  const [phoneError, setPhoneError] = useState(false)
  const [search, setSearch] = useState<string>('')
  const [hasSearched, setHasSearched] = useState(false)
  const [getCustomer, setGetCustomer] = useState<Customer[] | undefined>()
  const phoneRegex = /^[0-9]*$/
  const { mutate: findCustomerFun, isPending: findingCustomer } = useFindCustomer()
  const { data: todayStats, 
    isLoading: todayStatsLoading, 
    error: todayStatsError } = useGetTodayStats()

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
  return (
    <div className="grid gap-6">
      <AdminPagesHeader first={date} main={'Dashboard'}
        third={'Good Morning, Aksh'} right={<Admin />} />
      <FindCustomers phoneError={phoneError}
        hasSearched={hasSearched}
        findingCustomer={findingCustomer}
        findCustomer={getCustomer}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => findCustomer(e)} />
        
      <TodayActivity />

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-4">
        <TodaySales />
        <InventryAlert />
      </div>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-4">
        <RecentCustomers />
        <QuickActions />
      </div>
    </div>
  )
}

export default Dashboard