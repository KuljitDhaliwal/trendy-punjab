import { useSelector } from "react-redux"
import type { RootState } from "../store/Store"
import { Navigate, Outlet } from "react-router-dom"
import { toast } from "react-toastify"

function ProtectedRoutes() {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    if(!accessToken){
        toast.error('Not Authenticated!')
        return <Navigate to={'/login'} replace={true}/>
    }
  return (
    <main>
        <Outlet/>
    </main>
  )
}

export default ProtectedRoutes