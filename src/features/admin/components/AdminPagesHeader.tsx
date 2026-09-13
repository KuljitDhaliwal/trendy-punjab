
import type { ReactNode } from "react"

type AdminPageHeaderType = {
    first: string,
    main: string,
    third: string,
    right: ReactNode
}

function AdminPagesHeader({first, main, third, right}: AdminPageHeaderType) {
    return (
        <div className="flex justify-between items-center">
            <div className="grid gap-1">
                <p className="text-secondary-text text-[12px]">
                    {first}
                </p>
                <p className="text-2xl font-bold">{main}</p>
                <p className="text-secondary-text text-[14px]">{third}</p>
            </div>
            {right}
        </div>
    )
}

export default AdminPagesHeader