import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import AdminPagesHeader from "../../features/admin/components/AdminPagesHeader"
import { FaEdit, FaEnvelope, FaShieldAlt, FaUser } from "react-icons/fa"
import TodayActivityLayout from "../../features/admin/components/TodayActivityLayout"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/Store"
import useModalContext from "../../context/ModalContext"
import { useLogout } from "../../features/auth/api/auth.mutations"
import { setLogout } from "../../features/auth/slices/authSlice"
import { toast } from "react-toastify"
import { LuLogOut } from "react-icons/lu"
import Admin from "../../features/admin/components/Admin"


function AdminPage() {

    const navigate = useNavigate()
    const admin = useSelector((state: RootState) => state.auth.admin)
    const { mutate: logout, isPending } = useLogout()
    const { setModal } = useModalContext()
    const dispatch = useDispatch()


    //handle Logout
    const handleLogout = () => {
        logout(undefined, {
            onSuccess: (data) => {
                dispatch(setLogout())
                setModal(null)
                navigate('/', { replace: true })
                toast.success(data.message)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }


    return (
        <div className="flex flex-col gap-6 min-h-[calc(100vh-48px)]">
            <AdminPagesHeader first={'Profile Information'}
                main={'Profile'} third={'Manage your profile and account.'}
                right={(
                    <Button children={(<span className="flex items-center gap-2"><FaEdit /> Edit Profile</span>)}
                        onClick={() => navigate('/dashboard/settings')}
                        className="text-[12px] px-4 py-2 bg-orange-dark text-white" />
                )} />

            <div className="grid lg:grid-cols-[2fr_1fr] md:grid-cols-2 flex-1 gap-4 items-start">
                <TodayActivityLayout
                    head="Profile Information"
                    btn="not"
                    detail="Account is active and good standing."
                    icon={FaUser}
                    children={(
                        <div className="grid gap-6">
                            <div className="cursor-alias">
                                <Admin fullname={admin.fullname} role={admin.role} show={true} />
                            </div>
                            <div className="grid gap-4">
                                <div className="flex gap-3 items-center">
                                    <div className="rounded-md p-2 w-8 grid place-items-center h-8 bg-gray-200">
                                        <FaUser />
                                    </div>
                                    <p className="font-semibold">Full Name</p>
                                    {admin.fullname ? (
                                        <p className="text-secondary-text">
                                            {admin.fullname}
                                        </p>

                                    ) : (
                                        <div className="w-30 h-3 bg-gray-200 rounded-md"></div>
                                    )}
                                </div>
                                <hr className="text-border" />
                                <div className="flex gap-3 items-center">
                                    <div className="rounded-md p-2 w-8 grid place-items-center h-8 bg-gray-200">
                                        <FaEnvelope />
                                    </div>
                                    <p className="font-semibold">Email</p>
                                    <p className="text-secondary-text">
                                        {admin.email ? (
                                            <p className="text-secondary-text">
                                                {admin.email}
                                            </p>

                                        ) : (
                                            <div className="w-30 h-3 bg-gray-200 rounded-md"></div>
                                        )}
                                    </p>
                                </div>
                                <hr className="text-border" />
                                <div className="flex gap-3 items-center">
                                    <div className="rounded-md p-2 w-8 grid place-items-center h-8 bg-gray-200">
                                        <FaUser />
                                    </div>
                                    <p className="font-semibold">Role</p>
                                    <p className="text-secondary-text">
                                        {admin.role ? (
                                            <p className="text-secondary-text">
                                                {admin.role}
                                            </p>

                                        ) : (
                                            <div className="w-30 h-3 bg-gray-200 rounded-md"></div>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                />

                <TodayActivityLayout
                    head="Account Status"
                    btn="not"
                    detail="View your personal profile details."
                    icon={FaShieldAlt}
                    children={(
                        <div className="grid gap-4">
                            <div className="rounded-lg bg-green-300/30 p-4">
                                <div className="flex items-start gap-2">
                                    <div className="rounded-full w-2 h-2 bg-green-700 mt-1.5"></div>
                                    <div>
                                        <p className="text-green-700 font-semibold">Active Account</p>
                                        <p className="text-xs">You can acces all features and store.</p>
                                    </div>
                                </div>
                            </div>
                            <button className="flex text-center justify-center items-center float-end bg-red-700 text-white px-4 py-3 rounded-lg shadow gap-2 cursor-pointer active:scale-95"
                                onClick={() => setModal({
                                    type: "logout",
                                    data: {
                                        header: 'Logout',
                                        subHeading: (<p>Are you sure you want to logout from your account?
                                            <br />
                                            You will need to sign in again to access the dashboard.</p>),
                                        actionBtn: () => handleLogout(),
                                        actionBtnText: 'Logout',
                                        actionBtnDisabled: isPending
                                    }
                                })}>
                                <LuLogOut className="" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default AdminPage