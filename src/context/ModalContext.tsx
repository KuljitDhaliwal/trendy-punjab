import { createContext, useContext, useState, type ReactNode } from "react";
import type { ModalDataType } from "../components/Modal";

type ChildrenType = {
    children: ReactNode
}



type ModalType = {
    type: string,
    data: ModalDataType
}

type InitialDataType = {
    modal: ModalType | null,
    setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
    isActionPending: boolean;
    setIsActionPending: React.Dispatch<React.SetStateAction<boolean>>;
}


export const ModalContext = createContext<InitialDataType | undefined>(undefined)


export const ModalProvider = ({ children }: ChildrenType) => {
    const [isActionPending, setIsActionPending] = useState(false);
    const [modal, setModal] = useState<ModalType | null>(null)
    return (
        <ModalContext.Provider value={{ modal, setModal, isActionPending, setIsActionPending }}>{children}</ModalContext.Provider>
    )
}


const useModalContext = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('Modal Context not found!!')
    }
    return context
}


export default useModalContext