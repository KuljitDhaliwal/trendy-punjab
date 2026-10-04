import { Outlet } from "react-router-dom"
import AdminSidebar from "../features/admin/components/AdminSidebar"
import Modal from "../components/Modal"
import useModalContext from "../context/ModalContext"

function DashboardLayout() {
  const {modal} = useModalContext()
  return (
    <div className="flex md:flex-col flex-row">
      {modal && <Modal header={modal.data.header}
      subHeading={modal.data.subHeading}
      actionBtn={modal.data.actionBtn}
      actionBtnText={modal.data.actionBtnText}
      />}
      <AdminSidebar />
      <main className="md:pt-0 pt-18 lg:ml-70 md:ml-20 md:w-auto w-full transition-all duration-300 lg:p-6 p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout