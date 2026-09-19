import { useMutation } from "@tanstack/react-query";
import { getLogin, getLogout } from "./auth.api";

export const useLogin = () => {
    return useMutation({
        mutationFn: getLogin
    })
}



export const useLogout = () => {
    return useMutation({
        mutationFn: getLogout
    })
}