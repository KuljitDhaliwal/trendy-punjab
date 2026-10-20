import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { RootState } from "./store/Store";
import Loading from "./components/Loading";
import AuthInitializer from "./features/auth/api/AuthInitializer";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";


const queryClient = new QueryClient()

function App() {
  const isAuthLoading = useSelector((state: RootState)=> state.auth.isAuthLoading)  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer/>
      {isAuthLoading ? <Loading/> : <RouterProvider router={router}/>}
      <ToastContainer/>
    </QueryClientProvider>
  )
}

export default App