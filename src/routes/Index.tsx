import { Route, Routes } from "react-router-dom"
import Login from "../pages/auth/Login"
import DashboardLayout from "../layout/DashboardLayout"
import Dashboard from "../pages/Admin/Dashboard"
import Customers from "../pages/Admin/Customers"
import AddCustomer from "../pages/Admin/AddCustomer"
import DashboardCustomerLayout from "../layout/DashboardCustomerLayout"
import CustomerDetails from "../pages/Admin/CustomerDetails"
import EditCustomer from "../pages/Admin/EditCustomer"
import ProtectedRoutes from "./ProtectedRoutes"
import Products from "../pages/Admin/Products/Products"
import DashboardProductLayout from "../layout/DashboardProductLayout"
import AddProduct from "../pages/Admin/Products/AddProduct"


function Index() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path="/dashboard" element={<DashboardLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="customers" element={<DashboardCustomerLayout/>}>
                  <Route index element={<Customers/>}/>
                  <Route path='add-customer' element={<AddCustomer/>}/>
                  <Route path=':id' element={<CustomerDetails/>}/>
                  <Route path='edit-customer/:id' element={<EditCustomer/>}/>
                </Route>
                <Route path="products" element={<DashboardProductLayout/>}>
                  <Route index element={<Products/>} />
                  <Route path="add-product" element={<AddProduct/>} />
                </Route>
              </Route>
            </Route>
        </Routes>
    </div>
  )
}

export default Index