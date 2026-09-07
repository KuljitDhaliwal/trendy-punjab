type inputProps = {
    value?: string,
    item: {
        name: string,
        placeholder: string
    },
    type: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void | undefined
}
export const Input = ({ value, item, className, onChange, type }:inputProps) => {
    return (
        <input
            value={value}
            type={type}
            name={item.name}
            placeholder={item.placeholder}
            onChange={onChange}
            className={`w-full py-3 px-10 border rounded-md border-secondary-text/20 ${className}`} />
    )
}