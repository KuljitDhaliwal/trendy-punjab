import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";
import DashboardCustomerLayout from "../layout/DashboardCustomerLayout";
import DashboardProductLayout from "../layout/DashboardProductLayout";
import DashboardOrderLayout from "../layout/DashboardOrderLayout";
import DashboardSettingsLayout from "../layout/DashboardSettingsLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminInfo from "../features/admin/components/AdminInfo";
import NotFound from "../pages/auth/NotFound";
import Loading from "../components/Loading";

const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const Customers = lazy(() => import("../pages/Admin/Customers"));
const AddCustomer = lazy(() => import("../pages/Admin/AddCustomer"));
const CustomerDetails = lazy(() => import("../pages/Admin/CustomerDetails"));
const EditCustomer = lazy(() => import("../pages/Admin/EditCustomer"));

const Products = lazy(() => import("../pages/Products/Products"));
const AddProduct = lazy(() => import("../pages/Products/AddProduct"));
const ProductDetails = lazy(() => import("../pages/Products/ProductDetails"));
const EditProduct = lazy(() => import("../pages/Products/EditProduct"));

const Orders = lazy(() => import("../pages/Order/Orders"));
const CreateOrder = lazy(() => import("../pages/Order/CreateOrder"));
const OrderReceipt = lazy(() => import("../pages/Order/OrderReceipt"));

const Settings = lazy(() => import("../pages/Settings/Settings"));
const ChangePassword = lazy(() => import("../pages/Settings/ChangePassword"));
const AdminPage = lazy(() => import("../pages/Admin/AdminPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <AdminInfo />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
              { index: true, element: <Suspense fallback={<Loading />}><Dashboard /></Suspense> },
              { path: "admin-profile", element: <Suspense fallback={<Loading />}><AdminPage /></Suspense> },
              {
                path: "customers",
                element: <DashboardCustomerLayout />,
                children: [
                  { index: true, element: <Suspense fallback={<Loading />}><Customers /></Suspense> },
                  { path: "add-customer", element: <Suspense fallback={<Loading />}><AddCustomer /></Suspense> },
                  { path: ":id", element: <Suspense fallback={<Loading />}><CustomerDetails /></Suspense> },
                  { path: "edit-customer/:id", element: <Suspense fallback={<Loading />}><EditCustomer /></Suspense> },
                ],
              },
              {
                path: "products",
                element: <DashboardProductLayout />,
                children: [
                  { index: true, element: <Suspense fallback={<Loading />}><Products /></Suspense> },
                  { path: "add-product", element: <Suspense fallback={<Loading />}><AddProduct /></Suspense> },
                  { path: ":productID", element: <Suspense fallback={<Loading />}><ProductDetails /></Suspense> },
                  { path: "edit-product/:productID", element: <Suspense fallback={<Loading />}><EditProduct /></Suspense> },
                ],
              },
              {
                path: "orders",
                element: <DashboardOrderLayout />,
                children: [
                  { index: true, element: <Suspense fallback={<Loading />}><Orders /></Suspense> },
                  { path: "create-order/:customerID", element: <Suspense fallback={<Loading />}><CreateOrder /></Suspense> },
                  { path: "order/:orderID", element: <Suspense fallback={<Loading />}><OrderReceipt /></Suspense> },
                ],
              },
              {
                path: "settings",
                element: <DashboardSettingsLayout />,
                children: [
                  { index: true, element: <Suspense fallback={<Loading />}><Settings /></Suspense> },
                  { path: "change-password", element: <Suspense fallback={<Loading />}><ChangePassword /></Suspense> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);