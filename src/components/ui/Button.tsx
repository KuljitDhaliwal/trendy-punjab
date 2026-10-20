import type { ReactNode } from "react"



type Children = {
    children: ReactNode | string,
    className?: string,
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLInputElement>,
}

function Button({children, className, disabled, onClick}: Children) {
  return (
    <button disabled={disabled} 
    className={`${className} border border-gray-400/50 shrink-0
    cursor-pointer shadow rounded-lg md:text-base text-xs active:scale-99 disabled:cursor-not-allowed 
    disabled:active:scale-100`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button