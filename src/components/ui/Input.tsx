type inputProps = {
    value?: string,
    item: {
        name: string,
        placeholder: string
    },
    className?: string
}
export const Input = ({ value, item, className }:inputProps) => {
    return (
        <input
            value={value}
            name={item.name}
            placeholder={item.placeholder}
            className={`w-full py-3 px-10 border rounded-md border-secondary-text/20 ${className}`} />
    )
}