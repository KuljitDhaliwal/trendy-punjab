import type { IconType } from "react-icons";
import { QuickActionData } from "../../../static/QuickActions";
import TodayActivityLayout from "./TodayActivityLayout"
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { MdOutlineArrowRightAlt } from "react-icons/md";

function QuickActions() {
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
                        return <button key={item.id} className="w-full cursor-pointer flex 
                        justify-between items-center hover:bg-orange-400/50 p-2 rounded-lg">
                            <div className="flex gap-2 justify-start text-start">
                                <div className="rounded-full p-2 bg-green-600 h-fit text-white shadow">
                                    <Icon/>
                                </div>
                                <div>
                                    {item.title}
                                    <p className="text-[12px] text-secondary-text">{item.description}</p>
                                </div>
                            </div>
                            <MdOutlineArrowRightAlt/>
                        </button>
                    })}

                </div>
            )}
        />
    )
}

export default QuickActions