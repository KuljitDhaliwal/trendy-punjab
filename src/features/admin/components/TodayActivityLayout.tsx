import { MdOutlineArrowRightAlt } from "react-icons/md";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";


type ActivityDataType = {
    head: string,
    detail: string,
    icon: IconType,
    children: ReactNode,
    btn: string,
    btnData?: string,
    btnFun?: () => void
}


function TodayActivityLayout({ head, detail, icon, children, btn, btnData, btnFun }: ActivityDataType) {
    const Icon: IconType = icon
    return (
        <div className="bg-orange-light text-sm rounded-lg shadow p-4 
        grid gap-6 items-start grid-rows-[auto_1fr]">
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-2">
                    <div className="rounded-full p-1 shadow bg-orange-dark h-fit">
                        <Icon className="text-white" />
                    </div>
                    <div>
                        <p className="font-bold">{head}</p>
                        <p className="text-[12px] text-secondary-text">{detail}</p>
                    </div>
                </div>
                {btn === 'show' && (
                    <button onClick={btnFun} className="flex gap-1 underline cursor-pointer acitve:scale-95">
                        <p className="text-[12px] font-semibold">
                            {btnData}
                        </p>
                        <MdOutlineArrowRightAlt />
                    </button>
                )}
            </div>
            {children}
        </div>
    )
}

export default TodayActivityLayout