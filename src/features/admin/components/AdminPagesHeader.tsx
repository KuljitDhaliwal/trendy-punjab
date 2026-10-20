
import type { ReactNode } from "react"

type AdminPageHeaderType = {
    first: string,
    main: string,
    third: ReactNode,
    right: ReactNode
}

function AdminPagesHeader({first, main, third, right}: AdminPageHeaderType) {
    return (
        <div className="flex justify-between items-start w-full gap-12">
            <div className="grid gap-4 w-full">
                <div className="flex justify-between items-center w-full">
                    <p className="text-secondary-text text-[12px]">
                        {first}
                    </p>
                    {right}
                </div>
                <div className="grid gap-1">
                    <p className="md:text-2xl text-lg font-bold">{main}</p>
                    <div className="text-secondary-text text-wrap text-[14px]">{third}</div>
                </div>
            </div>
        </div>
    )
}

export default AdminPagesHeader