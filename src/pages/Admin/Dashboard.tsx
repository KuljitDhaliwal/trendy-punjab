
import Admin from "../../features/admin/components/Admin"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import FindCustomers from "../../features/admin/components/FindCustomers"
import InventryAlert from "../../features/admin/components/InventryAlert"
import QuickActions from "../../features/admin/components/QuickActions"
import RecentCustomers from "../../features/admin/components/RecentCustomers"
import TodayActivity from "../../features/admin/components/TodayActivity"
import TodaySales from "../../features/admin/components/TodaySales"
import { useTodayDate } from "../../hooks/TodayDate"

function Dashboard() {
  const { date } = useTodayDate()
  return (
    <div className="grid gap-6">
      <AdminPagesHeader first={date} main={'Dashboard'} 
      third={'Good Morning, Maria'} right={<Admin/>}/>
      <FindCustomers />
      <TodayActivity />

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-4">
        <TodaySales />
        <InventryAlert />
      </div>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-4">
        <RecentCustomers/>
        <QuickActions/>
      </div>
    </div>
  )
}

export default Dashboard