
type inputProps = {
    value?: string | number,
    item: {
        name: string,
        placeholder?: string
    },
    type?: React.HTMLInputTypeAttribute,
    icon: boolean,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void | undefined
}
export const Input = ({ value, item, className, onChange, type, icon }:inputProps) => {
    return (
        <input
            value={value}
            type={type}
            name={item.name}
            placeholder={item.placeholder}
            onChange={onChange}
            className={`w-full py-3 ${icon ? 'px-10' : 'px-4'} border rounded-md ${className}`} />
    )
}