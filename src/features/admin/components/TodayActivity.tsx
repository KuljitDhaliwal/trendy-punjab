import Card from "../../../components/Card"
import { TodayActivityData } from "../../../static/TodayActivityData"


function TodayActivity() {
  return (
    <div className="grid gap-6">
        <div className="grid gap-2">
            <p className="text-secondary-text">Today's Activity</p>
            <p className="font-bold">Today's Overview</p>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 justify-between items-center">
            {TodayActivityData.map((item, key)=>{
                return <Card key={key} name={item.name} detail={item.detail} icon={item.icon}/>
            })}
        </div>
    </div>
  )
}

export default TodayActivity