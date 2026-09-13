import { Route, Routes } from "react-router-dom"
import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"
import DashboardLayout from "../layout/DashboardLayout"
import Dashboard from "../pages/Admin/Dashboard"
import Customers from "../pages/Admin/Customers"


function Index() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
              <Route path="/dashboard" element={<DashboardLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="customers" index element={<Customers/>}/>
              </Route>
        </Routes>
    </div>
  )
}

export default Index