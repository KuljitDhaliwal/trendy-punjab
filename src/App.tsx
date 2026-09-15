import Index from "./routes/Index"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Index/>
      <ToastContainer/>
    </QueryClientProvider>
  )
}

export default App