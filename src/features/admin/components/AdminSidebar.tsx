import AdminNavbar from "./AdminNavbar"
import { IoIosCart } from "react-icons/io";
import { FaUser, FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useToggleCart } from "../../../context/ToggleCartContext";

import Admin from "./Admin";
import type { RootState } from "../../../store/Store";
function AdminSidebar() {
  const [toggleNav, setToggleNav] = useState(false)
  const [show, setShow] = useState<boolean>(true)
  const navigate = useNavigate()
  const location = useLocation()
  const { setToggleCart } = useToggleCart()

  //Logout function hook
  const admin = useSelector((state: RootState) => state.auth.admin)

  useEffect(() => {
    const resizeFun = () => {
      if (window.innerWidth <= 1023) {
        setShow(false)
      }else{
        setShow(true)
      }
    }

    window.addEventListener('resize', resizeFun)

    return ()=> {
      window.removeEventListener('resize', resizeFun)
    }

  }, [])

  console.log('Show', show)

  return (
    <div className={`
    fixed left-0 top-0 md:h-screen ${toggleNav ? 'h-screen' : 'h-14'}  
    z-1 backdrop-blur-2xl w-full lg:w-70 md:w-20 gap-10 overflow-hidden
    transition-all duration-300 lg:p-6 p-4 flex md:flex-col justify-start print:hidden
    `}>

      {/* Logo */}
      <div className="logo">
        <p>Trendy <span className="text-orange-dark font-bold">Punjab</span></p>
      </div>

      {/* Routes */}
      <div className="flex-1">
        <AdminNavbar setToggleNav={setToggleNav} toggleNav={toggleNav} />
      </div>



      {/* Sidebar Footer */}
      <div className="md:grid hidden gap-4 ">
        <Admin show={show} fullname={admin.fullname} role={admin.role} />
      </div>
      <div className="md:hidden flex self-start gap-4 text-xl">
        <button onClick={() => {navigate('/dashboard/admin-profile'), setToggleNav(false)}}>
          <FaUser className={`cursor-pointer ${window.location.pathname.includes('admin-profile') ? 'text-orange-dark' : ''}`} />
        </button>
        {location.pathname.includes('create-order') && (
          <button>
            <IoIosCart className="cursor-pointer md:hidden flex" onClick={() => setToggleCart((prev: boolean) => !prev)} />
          </button>
        )}
        {toggleNav ? (
          <button type="button">
            <FaTimes className="cursor-pointer" onClick={() => setToggleNav(false)} />
          </button>
        )
          : (
            <button type="button">
              <GiHamburgerMenu className="cursor-pointer" onClick={() => setToggleNav(true)} />
            </button>
          )}
      </div>
    </div>
  )
}

export default AdminSidebar