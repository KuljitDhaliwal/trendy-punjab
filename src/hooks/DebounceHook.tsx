import { useRef } from "react";



export const useDebounceHook = () => {
     const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const debounceFun = (fun: ()=> boolean, delay: number, onResult: (result: boolean) => void) => {
        if(timer.current){
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(()=>{
            const result = fun()
            onResult(result)
        }, delay)
    }

    return { debounceFun }

}