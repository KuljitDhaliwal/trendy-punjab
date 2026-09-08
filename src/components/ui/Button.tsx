import type { ReactNode } from "react"


type Children = {
    children: ReactNode | string,
    className?: string,
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button({children, className, disabled, onClick}: Children) {
  return (
    <button disabled={disabled} 
    className={`${className} text-[18px] px-10 border border-gray-400/50 disabled:opacity-40
    py-3 cursor-pointer shadow rounded-lg active:scale-99 disabled:cursor-not-allowed 
    disabled:active:scale-100 disabled:bg-linear-180 disabled:from-gray-400 
    disabled:to-gray-500`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button