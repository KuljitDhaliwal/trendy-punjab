import React, { createContext, useContext, useState, type ReactNode } from "react";


type ToggleCartType = {
    toggleCart: boolean,
    setToggleCart: React.Dispatch<React.SetStateAction<boolean>>,
    cartValue: number,
    setCartValue: React.Dispatch<React.SetStateAction<number>>
}

interface ToggleCartProviderProps {
  children: ReactNode;
}

export const ToggleCartContext = createContext<ToggleCartType | undefined>(undefined)

export const ToggleCartProvider = ({children}: ToggleCartProviderProps) => {
    const [toggleCart, setToggleCart] = useState<boolean>(false)
    const [cartValue, setCartValue] = useState<number>(0)
    return (
        <ToggleCartContext.Provider value={
            {
                toggleCart, 
                setToggleCart,
                cartValue,
                setCartValue
            }
        }>{children}</ToggleCartContext.Provider>
    )
}


export const useToggleCart = () => {
    const context = useContext(ToggleCartContext)
    if(!context){
        throw new Error('Toggle Context error!!')
    }

    return context
}