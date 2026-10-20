import type { ReactNode } from "react"
import { FaTimes } from "react-icons/fa"
import useModalContext from "../context/ModalContext"
import Spinner from "./ui/Spinner"

export type ModalDataType = {
    header?: string,
    subHeading?: ReactNode,
    actionBtn: ()=> void,
    actionBtnText?: ReactNode,
    actionBtnDisabled?: boolean
}




function Modal({ header, actionBtn, actionBtnText, subHeading }: ModalDataType) {
    const { setModal, isActionPending } = useModalContext()
    const handleCancel = () => {
        setModal(null)
    }
    return (
        <div className={`fixed backdrop-blur-sm bg-gray-900/20 inset-0 z-100`}>
            <div className="p-6 m-auto grid items-start gap-6 rounded-xl shadow bg-white
max-w-xl w-[90%] max-h-[85dvh] overflow-y-auto relative mt-40">
                <button onClick={handleCancel} className="cursor-pointer active:scale-95 justify-self-end w-fit p-2 bg-gray-200 rounded-full">
                    <FaTimes />
                </button>
                <div className="grid gap-2 self-start items-start">
                    <p className="text-2xl text-center font-bold tracking-wider">
                        {header}
                    </p>
                    <div className="text-secondary-text md:text-sm text-xs leading-5 text-center">
                        {subHeading}
                    </div>
                </div>
                <div className="flex justify-center self-start gap-4">
                    <button onClick={handleCancel} className="px-6 bg-white md:text-base text-xs border py-3 rounded-lg shadow cursor-pointer active:scale-95 border-border">Cancel</button>
                    <button onClick={()=>actionBtn()} 
                    disabled={isActionPending}
                    className="px-6 transition-all duration-300 disabled:cursor-not-allowed bg-orange-dark text-white shadow 
                    border py-3 rounded-lg cursor-pointer active:scale-95 md:text-base text-xs 
                    border-border">{isActionPending ? (<span className="flex gap-1 items-center justify-center">Logging Out <Spinner/></span>) : actionBtnText}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal