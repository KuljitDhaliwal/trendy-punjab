import type { IconType } from "react-icons"
import { AdminRoutesData } from "../../../static/AdminRoutesData"
import { NavLink } from "react-router-dom"

interface AdminNavbarProps {
    toggleNav: boolean,
    setToggleNav: React.Dispatch<React.SetStateAction<boolean>>
}

function AdminNavbar({ toggleNav, setToggleNav }: AdminNavbarProps) {
    return (
        <div className={`gap-2 ${toggleNav ? 'top-20 absolute left-1/2 -translate-x-1/2 w-[90%]' : 'md:grid hidden w-full'} grid`}>
            {AdminRoutesData.map((item, key) => {
                const Icon: IconType = item.icon
                return (
                    <div>
                        <NavLink onClick={() => setToggleNav(false)} key={item.name} to={item.route}
                            end={item.route === ''}
                            className={({ isActive }) =>
                                `flex items-center gap-2 w-full p-4 rounded-lg 
                            lg:justify-start border-l-2 md:justify-center 
                            ${isActive ? 'glass-card border-l-orange-500 text-orange-dark' :
                                    'border-l-transparent'
                                }`}>
                            <Icon className="text-xl" />
                            <p className={`lg:block md:hidden`}>
                                {item.name}
                            </p>
                        </NavLink>
                        {item.subRoutes && (
                            <div className="ml-8 mt-4 md:hidden grid">
                                {item.subRoutes.map((subRoute) => {
                                    const SubIcon = subRoute.icon
                                    return (<NavLink onClick={() => setToggleNav(false)} key={subRoute.name} to={subRoute.route}
                                        end={subRoute.route === ''}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 w-full p-4 rounded-lg 
                            lg:justify-start border-l-2 md:justify-center 
                            ${isActive ? 'glass-card border-l-orange-500 text-orange-dark' :
                                                'border-l-transparent'
                                            }`}>
                                        <SubIcon className="text-xl" />
                                        <p className={`lg:block md:hidden`}>
                                            {subRoute.name}
                                        </p>
                                    </NavLink>)
                                })}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default AdminNavbar