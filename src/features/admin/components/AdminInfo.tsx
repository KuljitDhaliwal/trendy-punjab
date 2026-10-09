import { useEffect } from "react"
import { useGetAdminInfo } from "../api/admin.queries"
import { useDispatch } from "react-redux"
import { setAdmin } from "../../auth/slices/authSlice"
import { Outlet } from "react-router-dom"
import Loading from "../../../components/Loading"
function AdminInfo() {

    const { data: adminData, isLoading: adminDataIsLoading, isError } = useGetAdminInfo()
    const dispatch = useDispatch()

    useEffect(() => {

        if (adminDataIsLoading) {
            return
        }

        if (isError || !adminData?.admin) {
            return;
        }


        dispatch(setAdmin({
            email: adminData.admin.email,
            fullname: adminData.admin.fullname,
            role: adminData.admin.role
        }))


    }, [dispatch, adminData, adminDataIsLoading, isError])



    if (adminDataIsLoading) {
        return <Loading/>
    }

    if (isError || !adminData?.admin) {
        return null;
    }

    return (
        <Outlet />
    )
}

export default AdminInfo