import Button from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import AuthLayout from "../../features/auth/components/AuthLayout"
import { LoginData } from '../../static/LoginData'
import Google from '../../assets/images/google.webp'
import { useState } from "react"
import type { Data } from "../../static/LoginData"
import type { IconType } from "react-icons"
import { useNavigate } from "react-router-dom"
import { useDebounceHook } from "../../hooks/DebounceHook"
import { handleFormValidation } from "../../utils/FormValidation"
import LineText from "../../components/LineText"
import { useLogin } from "../../features/auth/api/auth.mutations"
import { toast } from "react-toastify";

type LoginForm = {
  email: string;
  password: string;
};


function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()
  const { debounceFun } = useDebounceHook()
  const [formValue, setFormValue] = useState<LoginForm>({
    email: '',
    password: ''
  })

  //React Query
  const {mutate: login, isPending} = useLogin()


  //Handle Formvalue 
  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginError('')
    setFormValue(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === "email") {
      if (value.trim() === "") {
        setIsValid(true);
        return;
      }
      debounceFun(() => handleFormValidation(value), 1000, (result) => {
        setIsValid(result)
      })

    }

  }

  //Handle Show/hide Password
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }


  //Handle Submit Login
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //Login Funtion
    login(formValue, {
      onSuccess: (data) => {
        setFormValue({
          email: '',
          password: ''
        })
        toast.success("Login Successful!")
      },
      onError: (error) => {
        setLoginError(error.message)
        toast.error(error.message || 'Login Failed!')
      }
    })
  }


  return (
    <div className="text-sm">
      <AuthLayout children={(
        <div className='grid gap-4'>
          <div className="grid">
            <p className='text-bold text-2xl'>Signin to Your Account</p>
            <p className="text-secondary-text">Join Trendy Punjab and enjoy shopping</p>
          </div>
          <div className='grid gap-4'>
            {LoginData.map((item: Data, key: number) => {
              const Icon: IconType = item.icon
              const Eye: IconType | undefined = item.eye
              const EyeSlash: IconType | undefined = item.eyeSlash
              return <div key={key} className='grid gap-2'>
                <label htmlFor={item.name}>{item.label}</label>
                <div className="flex relative items-center">
                  <Icon className='absolute text-[22px] top-1/2 left-2 -translate-y-1/2' />
                  <Input item={item} icon={true}
                    type={item.name === 'password' && !showPassword ? 'password' : 'text'}
                    className={item.name !== 'email' ? 'border-secondary-text/20' : `${isValid === false ? 'outline-red-600 border-red-600' : 'border-secondary-text/20'}`}
                    onChange={(e) => handleFormValue(e)} value={formValue[item.name]}/>
                  {showPassword && EyeSlash ? (
                    <button
                      type="button"
                      onClick={handleShowPassword}
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <EyeSlash className="text-[16px]" />
                    </button>
                  ) : (
                    Eye && (
                      <button
                        type="button"
                        onClick={handleShowPassword}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        <Eye className="text-[16px]" />
                      </button>
                    )
                  )}
                </div>
                {item.name === 'email' && formValue.email.trim() !== '' && (
                  <small className={`text-red-400 text-[12px] ${isValid === false ? 'block' : 'hidden'}`}>Please fill email or phone properly.</small>
                )}
                {item.name === 'password' && (
                  <small className={`text-[12px] text-red-400`}>{loginError}</small>
                )}
              </div>
            })}
            <Button
              disabled={formValue.email === '' || formValue.password === '' || isPending}
              children={'Sign In'} className={`text-white bg-linear-45 px-10 py-3 from-orange-dark
             to-orange-600`} 
             onClick={handleSubmit} />
            <LineText lineColor={'bg-gray-300'} lineText={<p>or</p>} />
            <Button children={(
              <div className="flex justify-center gap-2 px-10 py-3 items-center">
                <img src={Google} alt="Google Logo" className="h-5" />
                <p>Continue with Google</p>
              </div>
            )} className={`bg-linear-45 bg-white`} />

            <p className="text-secondary-text text-center flex gap-2 justify-center">Don't have an account?
              <span className="text-orange-dark underline cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span></p>
          </div>
          <div>
          </div>
        </div>
      )} />
    </div>
  )
}

export default Login
