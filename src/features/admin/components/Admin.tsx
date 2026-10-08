import { useNavigate } from "react-router-dom"
import { nameInitials } from "../../../utils/NameInitials"

type AdminType = {
  fullname: string,
  role: string,
  show: boolean
}

function Admin({ fullname, role, show }: AdminType) {
  const navigate = useNavigate()
  return (
    <button className="flex gap-2 cursor-pointer lg:justify-start justify-center" onClick={() => navigate('/dashboard/admin-profile')}>
      <span className={`rounded-full grid place-items-center md:text-lg text-xs text-white p-2 md:w-10 md:h-10 h-8 w-8 ${fullname === '' ? 'animate-pulse bg-gray-200' : 'bg-orange-dark'}`}>
        <span>{nameInitials(fullname)}</span>
      </span>
      {show && (
        <span className="text-left grid">
          <span className="md:text-lg text-sm">{fullname === '' ? (
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-md"></div>
          ) : fullname}</span>
          <span className="text-secondary-text text-xs">
            {role === '' ? (
            <div className="h-2 w-16 bg-gray-200 animate-pulse rounded-md"></div>

            ) : `Shop ${role}`}
          </span>
        </span>
      )}
    </button>
  )
}

export default Admin