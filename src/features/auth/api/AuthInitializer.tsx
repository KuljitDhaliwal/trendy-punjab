import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store/Store"
import { setAccessToken, setAdmin, setIsAuthInitialized, setIsAuthLoading } from "../slices/authSlice"
import { useRefreshToken } from "./auth.queries"
import { useEffect } from "react"

function AuthInitializer() {

    const dispatch = useDispatch()

    const isAuthInitialized = useSelector(
        (state: RootState) => state.auth.isAuthInitialized
    )
    const { data, isLoading, error } = useRefreshToken(!isAuthInitialized)

    useEffect(() => {
        if (isLoading) return
        if (data?.accessToken) {
            dispatch(setAccessToken(data.accessToken))
        } else if (error) {
            dispatch(setAccessToken(null));
            dispatch(setAdmin(null));
        }


        dispatch(setIsAuthLoading(false))
        dispatch(setIsAuthInitialized(true))
    }, [dispatch, error, data, isLoading])



    return null

}

export default AuthInitializer