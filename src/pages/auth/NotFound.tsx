import { useNavigate } from "react-router-dom"


function NotFound() {
    const navigate = useNavigate()
  return (
    <div className="w-full h-screen grid place-items-center bg-white">
        <div className="grid gap-2 text-center">
            NotFound
            <button onClick={()=>navigate('/')} className="border border-border 
            bg-orange-dark px-8 py-3 rounded-lg shadow text-white">
                Home
            </button>
        </div>
    </div>
  )
}

export default NotFound