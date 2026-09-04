import type { ReactNode } from "react"


type Children = {
    children: ReactNode | string,
    className?: string
}

function Button({children, className}: Children) {
  return (
    <button className={`${className} text-[18px] px-10 border border-gray-400/50
    py-3 cursor-pointer shadow rounded-lg active:scale-99`}>
        {children}
    </button>
  )
}

export default Button