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
import DashboardProductLayout from "../layout/DashboardProductLayout"
import DashboardOrderLayout from "../layout/DashboardOrderLayout"
import Orders from "../pages/Order/Orders"
import CreateOrder from "../pages/Order/CreateOrder"
import OrderReceipt from "../pages/Order/OrderReceipt"
import Products from "../pages/Products/Products"
import AddProduct from "../pages/Products/AddProduct"
import ProductDetails from "../pages/Products/ProductDetails"
import EditProduct from "../pages/Products/EditProduct"
import DashboardSettingsLayout from "../layout/DashboardSettingsLayout"
import Settings from "../pages/Settings/Settings"
import ChangePassword from "../pages/Settings/ChangePassword"
import AdminPage from "../pages/Admin/AdminPage"
import AdminInfo from "../features/admin/components/AdminInfo"
import NotFound from "../pages/auth/NotFound"


function Index() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route element={<AdminInfo/>}>
                <Route path="/dashboard" element={<DashboardLayout/>}>
                  <Route index element={<Dashboard/>}/>
                  <Route path='admin-profile' element={<AdminPage/>}/>
                  <Route path="customers" element={<DashboardCustomerLayout/>}>
                    <Route index element={<Customers/>}/>
                    <Route path='add-customer' element={<AddCustomer/>}/>
                    <Route path=':id' element={<CustomerDetails/>}/>
                    <Route path='edit-customer/:id' element={<EditCustomer/>}/>                  
                  </Route>
                  <Route path="products" element={<DashboardProductLayout/>}>
                    <Route index element={<Products/>} />
                    <Route path="add-product" element={<AddProduct/>} />
                    <Route path=":productID" element={<ProductDetails/>} />
                    <Route path="edit-product/:productID" element={<EditProduct/>} />
                  </Route>
                  <Route path="orders" element={<DashboardOrderLayout/>}>
                    <Route index element={<Orders/>} />
                    <Route path="create-order/:customerID" element={<CreateOrder/>} />
                    <Route path="order/:orderID" element={<OrderReceipt/>} />
                  </Route>
                  <Route path="settings" element={<DashboardSettingsLayout/>}>
                    <Route index element={<Settings/>}/>
                    <Route path="change-password" element={<ChangePassword/>}/>
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default Index