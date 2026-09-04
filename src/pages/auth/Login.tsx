import Button from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import AuthLayout from "../../features/auth/components/AuthLayout"
import { LoginData } from '../../static/LoginData'
import Google from '../../assets/images/google.webp'
import { useState } from "react"
import type { Data } from "../../static/LoginData"
import type { IconType } from "react-icons"


function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div>
      <AuthLayout children={(
        <div className='grid gap-4'>
          <div className="grid gap-2">
            <p className='text-bold text-secondary-text'>Sign in to Trendy Punjab</p>
          </div>
          <div className='grid gap-6'>
            {LoginData.map((item: Data, key: number) => {
              const Icon: IconType = item.icon
              const Eye: IconType | undefined = item.eye
              const EyeSlash: IconType | undefined = item.eyeSlash
              return <div key={key} className='grid gap-2'>
                <label htmlFor={item.name}>{item.label}</label>
                <div className="flex relative">
                  <Icon className='absolute text-[22px] top-1/2 left-2 -translate-y-1/2' />
                  <Input item={item} />
                  {showPassword && EyeSlash ? (
                    <EyeSlash
                      onClick={handleShowPassword}
                      className="absolute text-[22px] top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                    />
                  ) : (
                    Eye && (
                      <Eye
                        onClick={handleShowPassword}
                        className="absolute text-[22px] top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                      />
                    )
                  )}
                </div>
              </div>
            })}
            <Button children={'Sign In'} className={`text-white bg-linear-45 from-orange-dark to-orange-600`} />
            <div className="flex items-center gap-2">
              <div className="h-px w-full bg-gray-300"></div>
              <p>or</p>
              <div className="h-px w-full bg-gray-300"></div>
            </div>
            <Button children={(
              <div className="flex justify-center gap-2 items-center">
                <img src={Google} alt="Google Logo" className="h-5" />
                <p>Continue with Google</p>
              </div>
            )} className={`bg-linear-45 bg-white`} />

            <p className="text-secondary-text text-center flex gap-2 justify-center">Don't have an account?
              <span className="text-orange-dark underline cursor-pointer">Sign Up</span></p>
          </div>
          <div>
          </div>
        </div>
      )} />
    </div>
  )
}

export default Login
{/* <div className="rounde-left rounded-full bg-linear-180 w-100 h-100
from-orange-700 via-orange-600 to-yellow-400 shadow-2xl absolute
top-1/2 -left-1/2 translate-x-1/2 blur-lg"></div> */}