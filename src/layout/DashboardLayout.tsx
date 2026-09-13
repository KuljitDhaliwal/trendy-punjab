import { Outlet } from "react-router-dom"
import AdminSidebar from "../features/admin/components/AdminSidebar"

function DashboardLayout() {
  return (
    <div className="flex md:flex-col flex-row">
      <AdminSidebar />
      <main className="md:pt-0 pt-18 lg:ml-70 md:ml-20 md:w-auto w-full transition-all duration-300 lg:p-6 p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout