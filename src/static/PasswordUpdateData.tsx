import { FaEye, FaEyeSlash } from "react-icons/fa";

export const PasswordUpdateData = [
    {
        name: 'currentPassword',
        label: 'Current Password',
        placeholder: 'Enter current passsword',
        show: FaEye,
        hide: FaEyeSlash
    },
    {
        name: 'newPassword',
        label: 'New Password',
        placeholder: 'Enter new passsword',
        show: FaEye,
        hide: FaEyeSlash
    },
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        placeholder: 'confirm new passsword',
        show: FaEye,
        hide: FaEyeSlash
    },
]