import type { InputEventHandler } from "react"
import { forwardRef } from 'react'

type InputProps = {
    value?: string | number,
    item: {
        name: string,
        placeholder?: string
    },
    type?: React.HTMLInputTypeAttribute,
    icon: boolean,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void | undefined,
    ref: InputEventHandler,
    onClick: (key: number | string) => void,
    clickKey: number | string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ value, item, className, onChange, type, icon, onClick, clickKey}, ref) => {
    return (
        <input
            onClick={()=>onClick(clickKey)}
            ref={ref}
            value={value}
            type={type}
            name={item.name}
            placeholder={item.placeholder}
            onChange={onChange}
            className={`w-full py-3 ${icon ? 'px-10' : 'px-4'} border rounded-md ${className}`} />
    )
}
);