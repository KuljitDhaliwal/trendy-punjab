import { createContext, useState, type ReactNode } from "react";


type ToggleCartType = {
    toggleCart: boolean,
    setToggleCart: React.Dispatch<React.SetStateAction<boolean>>
}

interface ToggleCartProviderProps {
  children: ReactNode;
}

export const ToggleCartContext = createContext<ToggleCartType | undefined>(undefined)

export const ToggleCartProvider = ({children}: ToggleCartProviderProps) => {
    const [toggleCart, setToggleCart] = useState<boolean>(false)
    return (
        <ToggleCartContext.Provider value={{toggleCart, setToggleCart}}>{children}</ToggleCartContext.Provider>
    )
}