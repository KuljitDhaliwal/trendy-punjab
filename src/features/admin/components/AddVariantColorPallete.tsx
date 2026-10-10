import { useState } from "react"


type ColorType = {
    name: string,
    hex: string
}

type ColorOption = {
    colorOptions: ColorType[],
    onClick: (color: string) => void,
    selectedColor: string
}



function AddVariantColorPallete({ colorOptions, onClick, selectedColor }: ColorOption) {
    const [hoverColor, setHoverColor] = useState("")
    
    const handleSelectColor = (color: string) => {
        onClick(color)
    }

    const handleMouseOverTooltip = (color: string) => {
        setHoverColor(color)
    }

    const handleMouseLeaveTooltip = () => {
        setHoverColor("")
    }
    return (
        <div className="grid gap-2">
            <p className="text-sm">Choose Color</p>
            <div className="rounded-lg relative border border-border flex flex-wrap gap-2 p-4">
                {colorOptions.map((color, key) => {
                    return <div key={key}>
                        <button 
                        onMouseEnter={()=>handleMouseOverTooltip(color.name)} 
                        onClick={() => handleSelectColor(color.hex)}
                        onMouseLeave={handleMouseLeaveTooltip}
                            className={`rounded-full w-6 group relative
                        active:scale-95 ${selectedColor === color.hex ? 'border-[#D9D9D9] border-6' : 'border-transparent'}
                        h-6 cursor-pointer`}
                            style={{ backgroundColor: color.hex }}
                        >
                        <span className={`${hoverColor === color.name ? 'block' : 'hidden'} 
                        bg-white absolute -top-8 p-1 rounded-md shadow text-nowrap`}>{hoverColor}</span>
                        </button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default AddVariantColorPallete