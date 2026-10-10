import type { ReactNode } from "react"
import { FaTimes } from "react-icons/fa"
import useModalContext from "../context/ModalContext"

export type ModalDataType = {
    header?: string,
    subHeading?: ReactNode,
    actionBtn?: ()=> void,
    actionBtnText?: string,
    actionBtnDisabled?: boolean
}




function Modal({ header, actionBtn, actionBtnText, subHeading, actionBtnDisabled }: ModalDataType) {
    const { setModal } = useModalContext()
    const handleCancel = () => {
        setModal(null)
    }
    return (
        <div className={`fixed backdrop-blur-sm bg-gray-900/20 inset-0 z-100`}>
            <div className="p-6 mx-auto top-40 grid items-start gap-6 rounded-xl shadow bg-white max-w-xl h-fit absolute inset-0 md:w-full w-[90%]">
                <button onClick={handleCancel} className="cursor-pointer active:scale-95 justify-self-end w-fit p-2 bg-gray-200 rounded-full">
                    <FaTimes />
                </button>
                <div className="grid gap-2">
                    <p className="text-2xl text-center font-bold tracking-wider">
                        {header}
                    </p>
                    <div className="text-secondary-text text-sm text-center">
                        {subHeading}
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={handleCancel} className="px-6 bg-white border py-3 rounded-lg shadow cursor-pointer active:scale-95 border-border">Cancel</button>
                    <button onClick={actionBtn} disabled={actionBtnDisabled}
                    className="px-6 bg-orange-dark text-white shadow 
                    border py-3 rounded-lg cursor-pointer active:scale-95 
                    border-border">{actionBtnText}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal