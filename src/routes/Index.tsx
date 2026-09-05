import { Route, Routes } from "react-router-dom"
import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"


function Index() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </div>
  )
}

export default Index