import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store/Store"
import { setAccessToken, setIsAuthInitialized, setIsAuthLoading } from "../slices/authSlice"
import { useRefreshToken } from "./auth.queries"
import { useEffect } from "react"

function AuthInitializer() {

    const dispatch = useDispatch()
    const accesstoken = useSelector(
        (state: RootState) => state.auth.accessToken
    )
    const isAuthInitialized = useSelector(
        (state: RootState) => state.auth.isAuthInitialized
    )
    const { data, isLoading } = useRefreshToken(!isAuthInitialized)

    useEffect(() => {
        if (isLoading) return
        if (data) {
            dispatch(setAccessToken(data.accessToken))
        }
        dispatch(setIsAuthLoading(false))
        dispatch(setIsAuthInitialized(true))
    }, [dispatch, accesstoken, data, isLoading])

    return null

}

export default AuthInitializer