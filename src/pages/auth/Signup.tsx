import Button from "../../components/ui/Button"
import AuthLayout from "../../features/auth/components/AuthLayout"
import Google from '../../assets/images/google.webp'
import { useNavigate } from "react-router-dom"
import { SignupData } from "../../static/SignupData"
import type { Data } from "../../static/SignupData"
import type { IconType } from "react-icons"
import { Input } from "../../components/ui/Input"
import { useState } from "react"

function Signup() {
    const [showPassword, setShowPassword] = useState(
        {
            password: false,
            confirmPassword: false
        }
    )
    const navigate = useNavigate()

    type handlePassword = keyof typeof showPassword
    const handleShowPassword = (btnName: handlePassword) => {
        setShowPassword(prev => (
            {
                ...prev,
                [btnName]: !prev[btnName]
            }
        ))
    }
    console.log('Arr', showPassword)
    return (
        <div className="text-sm">
            <AuthLayout children={(
                <div className='grid gap-4'>
                    <div className="grid">
                        <p className='text-bold text-2xl'>Create Your Account</p>
                        <p className="text-secondary-text">Join Trendy Punjab and enjoy shopping</p>
                    </div>
                    <div className='grid gap-4'>
                        {SignupData.map((item: Data, key: number) => {
                            const Icon: IconType = item.icon
                            const Eye: IconType | undefined = item.eye
                            const EyeSlash: IconType | undefined = item.eyeSlash
                            return <div key={key} className='grid gap-2'>
                                <label htmlFor={item.name}>{item.label}</label>
                                <div className="flex relative">
                                    <Icon className='absolute text-[22px] top-1/2 left-2 -translate-y-1/2' />
                                    <Input item={item} icon={true}
                                    type={(item.name === 'password' || 
                                    item.name === 'confirmPassword') && 
                                    !showPassword[item.name as handlePassword] ? 
                                    'password' : 'text'}/>

                                    {showPassword[item.name as handlePassword] && EyeSlash ? (
                                        <button
                                            type="button"
                                            onClick={() => handleShowPassword(item.name as handlePassword)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2"
                                        >
                                            <EyeSlash className="text-[22px]" />
                                        </button>
                                    ) : (
                                        Eye && (
                                            <button
                                                type="button"
                                                onClick={() => handleShowPassword(item.name as handlePassword)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                            >
                                                <Eye className="text-[22px]" />
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        })}
                        <Button children={'Sign In'} className={`text-white px-10 py-3 bg-linear-45 from-orange-dark to-orange-600`} />
                        <div className="flex items-center gap-2">
                            <div className="h-px w-full bg-gray-300"></div>
                            <p>or</p>
                            <div className="h-px w-full bg-gray-300"></div>
                        </div>
                        <Button children={(
                            <div className="flex justify-center gap-2 px-10 py-3 items-center">
                                <img src={Google} alt="Google Logo" className="h-5" />
                                <p>Continue with Google</p>
                            </div>
                        )} className={`bg-linear-45 bg-white`} />

                        <p className="text-secondary-text text-center flex gap-2 justify-center">Don't have an account?
                            <span className="text-orange-dark underline cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                        </p>
                    </div>
                    <div>
                    </div>
                </div>
            )} />
        </div>
    )
}

export default Signup