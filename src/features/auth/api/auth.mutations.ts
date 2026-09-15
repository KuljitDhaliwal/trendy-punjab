import { useMutation } from "@tanstack/react-query";
import { getLogin } from "./auth.api";

export const useLogin = () => {
    return useMutation({
        mutationFn: getLogin
    })
}