import type { IconType } from "react-icons";
import { QuickActionData } from "../../../static/QuickActions";
import TodayActivityLayout from "./TodayActivityLayout"
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function QuickActions() {
    const navigate = useNavigate()
    return (
        <TodayActivityLayout
            head={'Quick Actions'}
            detail={'Common task for the shop floor'}
            icon={AiTwotoneThunderbolt}
            btn={'hidden'}
            children={(
                <div className="grid gap-4">
                    {QuickActionData.map(item => {
                        const Icon: IconType = item.icon
                        return <button key={item.id} className="w-full cursor-pointer flex active:scale-95
                        justify-between items-center hover:bg-orange-400/50 p-2 px-4 rounded-lg" onClick={()=>navigate(item.route)}>
                            <span className="flex gap-2 justify-start text-start">
                                <span className="rounded-full p-2 bg-green-600 h-fit text-white shadow">
                                    <Icon/>
                                </span>
                                <span>
                                    {item.title}
                                    <p className="text-[12px] text-secondary-text">{item.description}</p>
                                </span>
                            </span>
                            <MdOutlineArrowRightAlt/>
                        </button>
                    })}

                </div>
            )}
        />
    )
}

export default QuickActions