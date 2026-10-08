import type { IconType } from "react-icons"
import { SettingsNavbarData } from "../../../static/SettingsNavbarData"
import { NavLink } from "react-router-dom"

function SettingsNavbar() {
  return (
    <div className="bg-[#233d4d] h-fit p-4 md:grid hidden rounded-xl shadow-[rgba(0,0,0,0,1)]">
        <div className="grid gap-4">
            {SettingsNavbarData.map(item => {
                const Icon: IconType = item.icon
                return <NavLink to={item.route} end
                className={({isActive, isPending})=> `${isActive ? 'bg-[#fe7f2d] text-white' : 'text-white'} flex gap-2 items-center p-4 rounded-2xl`}>
                    <Icon/>
                    <p>{item.label}</p>
                </NavLink>
            })}
        </div>
    </div>
  )
}

export default SettingsNavbar