import { useQuery } from "@tanstack/react-query"
import { getRefreshToken } from "./auth.api"

export const useRefreshToken = (enabled: boolean) => {
    return useQuery(
        {
            queryKey: ['accessToken'],
            queryFn: getRefreshToken,
            enabled,
            retry: false
        })
}


