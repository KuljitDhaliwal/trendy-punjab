import AdminNavbar from "./AdminNavbar"
import { IoIosSettings } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { FaUser, FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setLogout } from "../../auth/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../auth/api/auth.mutations";
import { toast } from "react-toastify";
function AdminSidebar() {
  const [toggleNav, setToggleNav] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Logout function hook
  const { mutate: logout } = useLogout()

  //handle Logout
  const handleLogout = () => {
    logout(undefined,{
      onSuccess: (data) => {
        dispatch(setLogout())
        navigate('/', { replace: true })
        toast.success(data.message)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return (
    <div className={`
    fixed left-0 top-0 md:h-screen ${toggleNav ? 'h-screen' : 'h-14'}  
    z-1 bg-orange-light w-full lg:w-70 md:w-20 gap-10 overflow-hidden
    transition-all duration-300 lg:p-6 p-4 flex md:flex-col justify-start
    `}>

      {/* Logo */}
      <div className="logo">
        <p>Trendy <span className="text-orange-dark font-bold">Punjab</span></p>
      </div>

      {/* Routes */}
      <div className="flex-1">
        <AdminNavbar toggleNav={toggleNav} />
      </div>


      {/* Sidebar Footer */}
      <div className="md:grid hidden gap-4 ">
        <button className="flex gap-2 cursor-pointer active:scale-95">
          <IoIosSettings className="text-xl" />
          <p className="lg:block hidden">Settings</p>
        </button>
        <button className="flex gap-2 cursor-pointer active:scale-95" onClick={handleLogout}>
          <LuLogOut className="text-xl" />
          <p className="lg:block hidden">Logout</p>
        </button>
      </div>
      <div className="md:hidden flex self-start gap-4 text-xl">
        <FaUser className="cursor-pointer" />
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