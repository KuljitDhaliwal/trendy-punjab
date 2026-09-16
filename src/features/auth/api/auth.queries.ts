import { useQuery } from "@tanstack/react-query"
import { getRefreshToken } from "./auth.api"

export const useRefreshToken = () => {
    return useQuery({queryKey: ['accessToken'], queryFn: getRefreshToken})
}