import { FaKey } from "react-icons/fa"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import SettingsLayout from "../../features/admin/components/SettingsLayout"
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout"
import CustomerPagesFooter from "../../features/admin/components/CustomerPagesFooter"
import { useState } from "react"
import type { AdminProfilePasswordType } from "../../types/AdminProfile"
import { useUpdateAdminPassword } from "../../features/admin/api/admin.mutations"
import { toast } from "react-toastify"
import { PasswordUpdateData } from "../../static/PasswordUpdateData"
import type { IconType } from "react-icons"


function ChangePassword() {
    const [formValue, setFormValue] = useState<AdminProfilePasswordType>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [formError, setFormError] = useState<Record<string, string>>({})
    const [passwordShow, setPasswordShow] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    })

    const { mutate: updateAdminPassword } = useUpdateAdminPassword()
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

    const handleFormValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = e.target || e.currentTarget
        setFormError(prev => ({ ...prev, [name]: '' }))

        setFormValue(prev => ({
            ...prev,
            [name]: value
        }))

        if (value.length < 3) return
        if (!passwordRegex.test(value) && name !== 'currentPassword') {
            setFormError(prev => ({ ...prev, [name]: 'Use 8+ characters with a capital letter, number & special character.' }))
        }
    }




    const handleUpdate = () => {
        const errors: Record<string, string> = {};

        for (const [key, value] of Object.entries(formValue)) {
            if (value === '') {
                errors[key] = 'Please enter password!!'
            }
        }

        setFormError(errors)

        if (Object.entries(errors).length > 0) {
            return
        }


        if (formValue.confirmPassword !== formValue.newPassword) {
            setFormError(prev => ({ ...prev, ['not-match']: 'Password not matching!!' }))
            return
        }
        updateAdminPassword({
            currentPassword: formValue.currentPassword,
            newPassword: formValue.newPassword
        }, {
            onSuccess: () => {
                toast.success('Password updated!!')
                setFormValue(
                    {
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    }
                )
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }
    const handleCancel = () => {
        console.log('Clicked')
    }
    return (
        <div className="flex flex-col gap-6 min-h-[calc(100vh-50px)]">
            <AdminPagesHeader first={'Inventery Management'}
                main={'Settings'} third={'Manage your profile, store information and app preferences.'}
                right={('')} />
            <SettingsLayout children={
                <div className="grid gap-6">
                    <TodayActivityLayout
                        head="Change Password"
                        btn="not"
                        detail="Update your password to keep your account safe."
                        icon={FaKey}
                        children={(
                            <div className="grid gap-4">
                                {PasswordUpdateData.map((item) => {
                                    const Show: IconType = item.show
                                    const Hide: IconType = item.hide
                                    return <div className={`grid gap-2`}>
                                        <label htmlFor={item.name}>{item.label}</label>
                                        <div className="relative">
                                            <input type={passwordShow[item.name as keyof AdminProfilePasswordType] ? 'text' : 'password'} value={formValue[item.name as keyof AdminProfilePasswordType]} name={item.name} onChange={handleFormValue}
                                                placeholder={item.placeholder} className="border border-border p-3 px-4 pr-10 w-full rounded-md" />
                                            {
                                                passwordShow[item.name as keyof AdminProfilePasswordType] ? (
                                                    <button className="group" onClick={() => setPasswordShow(prev => ({ ...prev, [item.name]: false }))}>
                                                        <Hide className="absolute text-[18px] group-active:scale-95 right-5 cursor-pointer top-1/2 -translate-y-1/2" />
                                                    </button>
                                                ) : (
                                                    <button className="group" onClick={() => setPasswordShow(prev => ({ ...prev, [item.name]: true }))}>
                                                        <Show className="absolute text-[18px] group-active:scale-95 right-5 cursor-pointer top-1/2 -translate-y-1/2" />
                                                    </button>
                                                )
                                            }
                                        </div>
                                        {formError[item.name] && (
                                            <p className="text-red-600 text-xs">{formError[item.name]}</p>
                                        )}
                                    </div>
                                })}
                                {formError['not-match'] && (
                                    <p className="text-red-600 text-xs">{formError['not-match']}</p>
                                )}
                            </div>
                        )}
                    />
                </div>
            } />

            <CustomerPagesFooter btn1Text="Cancel"
                btn2Text="Update"
                btn2ClickFun={handleUpdate}
                btn1ClickFun={handleCancel} />
        </div>
    )
}

export default ChangePassword