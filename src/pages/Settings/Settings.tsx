import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import SettingsLayout from "../../features/admin/components/SettingsLayout"
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout"
import { FaUser } from "react-icons/fa"
import CustomerPagesFooter from "../../features/admin/components/CustomerPagesFooter"
import { useEffect, useRef, useState } from "react"
import type { AdminProfileType } from "../../types/AdminProfile"
import { useUpdateAdminData } from "../../features/admin/api/admin.mutations"
import { toast } from "react-toastify"
import { useGetAdminInfo } from "../../features/admin/api/admin.queries"

function Settings() {
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)
    const [formValue, setFormValue] = useState<AdminProfileType>({
        fullname: '',
        role: 'Owner'
    })
    const [original, setOriginal] = useState<AdminProfileType>({
        fullname: '',
        role: 'Owner'
    })
    const { data, isLoading, error, refetch, isFetched, isFetching } = useGetAdminInfo()
    const { mutate: updateAdminProfile, isPending } = useUpdateAdminData()


    useEffect(() => {
        if (!data) return
        setFormValue({
            fullname: data.admin.fullname,
            role: data.admin.role
        })
        setOriginal({
            fullname: data.admin.fullname,
            role: data.admin.role
        })
    }, [data])

    const handleFormValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target || e.currentTarget
        setFormValue(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleInputActive = () => {
        inputRef.current?.select()
    }

    const handleUpdate = () => {
        updateAdminProfile(formValue, {
            onSuccess: () => {
                toast.success('Profile Updates!!')
                setOriginal(formValue)
            },
            onError: () => {
                toast.error('Profile update error!!')
            }
        })
    }

    const handleCancel = () => {
        if (!data) return
        setFormValue({
            fullname: data.admin.fullname,
            role: data.admin.role
        })
    }

    return (
        <div className="flex flex-col gap-6 min-h-[calc(100vh-50px)]">
            <AdminPagesHeader first={'Inventery Management'}
                main={'Settings'} third={'Manage your profile, store information and app preferences.'}
                right={(
                    <Button children={<span className="flex items-center gap-1"><FaUser /> Check Profile</span>} onClick={() => navigate('/dashboard/admin-profile')}
                        className="text-[12px] px-4 py-2 bg-orange-dark text-white" />
                )} />
            <SettingsLayout children={
                <div className="grid gap-6">
                    <TodayActivityLayout
                        head="Profile Information"
                        btn="not"
                        detail="All information about profile"
                        icon={FaUser}
                        children={(
                            isLoading && !isFetched ? (
                                <div className="grid md:grid-cols-2 gap-2">
                                    <div className="grid gap-2">
                                        <div className="h-4 rounded-md animate-pulse w-40 bg-gray-200" />
                                        <div className="h-6 rounded-md animate-pulse w-full bg-gray-200" />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="h-4 rounded-md animate-pulse w-40 bg-gray-200" />
                                        <div className="h-6 rounded-md animate-pulse w-full bg-gray-200" />
                                    </div>
                                </div>
                            ) : error || (isFetching && !data) ? (
                                <div className="w-full p-4 glass-card grid place-items-center">
                                    <span className="grid gap-2 w-full text-center text-xs">
                                        <span>Unable to load admin information</span>
                                        <span>Something went wrong while fetching data!!</span>
                                        <button onClick={() => refetch()} disabled={isFetching} className={
                                            `px-4 w-full disabled:cursor-not-allowed cursor-pointer rounded-md bg-white active:scale-95 py-3 text-xs border border-border`
                                        }>
                                            {isFetching ? 'Refetching...' : 'Try again'}
                                        </button>
                                    </span>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-2">
                                    <div className="grid gap-2">
                                        <label htmlFor="fullname">Full Name</label>
                                        <input onClick={handleInputActive} ref={inputRef} type="text" value={formValue.fullname} name="fullname" onChange={handleFormValue}
                                            placeholder="Enter your name" className="border border-border p-3 px-4 rounded-md" />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="role">Role</label>
                                        <select disabled name="role" value={formValue.role} onChange={handleFormValue}
                                            className="border border-border p-3 px-3 rounded-md">
                                            <option value="Owner">Owner</option>
                                            <option value="Manager">Manager</option>
                                        </select>
                                    </div>
                                </div>
                            )

                        )}
                    />
                </div>
            } />

            <CustomerPagesFooter btn1Text="Cancel"
                btn2Text="Update"
                btn2disabled={
                    isLoading ||
                    isPending ||
                    JSON.stringify(original) === JSON.stringify(formValue)
                }
                btn2ClickFun={handleUpdate}
                btn1ClickFun={handleCancel} />
        </div>
    )
}

export default Settings