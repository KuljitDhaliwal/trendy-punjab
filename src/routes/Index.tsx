import { Route, Routes } from "react-router-dom"
import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"
import DashboardLayout from "../layout/DashboardLayout"
import Dashboard from "../pages/Admin/Dashboard"
import Customers from "../pages/Admin/Customers"
import AddCustomer from "../pages/Admin/AddCustomer"
import DashboardCustomerLayout from "../layout/DashboardCustomerLayout"


function Index() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
              <Route path="/dashboard" element={<DashboardLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="customers" element={<DashboardCustomerLayout/>}>
                  <Route index element={<Customers/>}/>
                  <Route path='add-customer' element={<AddCustomer/>}/>
                </Route>
              </Route>
        </Routes>
    </div>
  )
}

export default Index