import type { ReactNode } from "react"

type Classes = {
    lineColor: string,
    lineText: ReactNode
}

function LineText({lineColor, lineText}:Classes) {
    return (
        <div className="flex items-center gap-2">
            <div className={`h-px w-full ${lineColor}`}></div>
                {lineText}
            <div className={`h-px w-full ${lineColor}`}></div>
        </div>
    )
}

export default LineText