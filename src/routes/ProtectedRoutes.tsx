import { useSelector } from "react-redux"
import type { RootState } from "../store/Store"
import { Navigate, Outlet } from "react-router-dom"


function ProtectedRoutes() {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)
    if(!accessToken){
        return <Navigate to={'/'} replace={true}/>
    }
  return (
    <main>
        <Outlet/>
    </main>
  )
}

export default ProtectedRoutes