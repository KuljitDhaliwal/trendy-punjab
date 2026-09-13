import type { IconType } from "react-icons"
import { AdminRoutesData } from "../../../static/AdminRoutesData"
import { NavLink } from "react-router-dom"

interface AdminNavbarProps {
    toggleNav: boolean
}

function AdminNavbar({toggleNav}: AdminNavbarProps) {
    return (
        <div className={`gap-2 ${toggleNav ? 'top-20 absolute left-1/2 -translate-x-1/2 w-[90%]' : 'md:grid hidden w-full'} grid`}>
            {AdminRoutesData.map(item => {
                const Icon: IconType = item.icon
                return (
                    <NavLink to={item.route}
                        end={item.route === ''}
                        className={({ isActive }) =>
                            `flex items-center gap-2 w-full p-2 rounded-lg lg:justify-start border-l-2 md:justify-center 
                        transition-all duration-300 ${isActive ? 'bg-orange-400/50 border-l-orange-500' :
                                'border-l-transparent'
                            }`}>
                        <Icon className="text-xl" />
                        <p className={`lg:block md:hidden`}>
                            {item.name}
                        </p>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default AdminNavbar