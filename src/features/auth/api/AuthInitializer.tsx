import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store/Store"
import { setAccessToken, setIsAuthLoading } from "../slices/authSlice"
import { useRefreshToken } from "./auth.queries"
import { useEffect } from "react"

function AuthInitializer() {

    const dispatch = useDispatch()
    const accesstoken = useSelector((state: RootState) => state.auth.accessToken)
    const { data, isLoading } = useRefreshToken()

    useEffect(() => {
        if (accesstoken) {
            dispatch(setIsAuthLoading(false))
            return
        }
        if(!isLoading){
            if (data) {
                dispatch(setAccessToken(data.accessToken))
            }
            dispatch(setIsAuthLoading(false))
        }
    }, [dispatch, accesstoken, data, isLoading])
    
    return null

}

export default AuthInitializer