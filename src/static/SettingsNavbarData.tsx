import { FaKey, FaUser } from "react-icons/fa";

export const SettingsNavbarData = [
    {
        label: 'Edit Profile',
        icon: FaUser,
        route: '/dashboard/settings'
    },
    {
        label: 'Change Password',
        icon: FaKey,
        route: '/dashboard/settings/change-password'
    },
]