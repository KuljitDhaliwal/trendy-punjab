import { CiUser, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import type { IconType } from "react-icons";
export type Data = {
    name: "email" | "password",
    label: string,
    placeholder: string,
    icon: IconType,
    eye?: IconType,
    eyeSlash?: IconType
}

export const LoginData: Data[] = [
    {
        name: 'email',
        label: 'Email or Phone',
        placeholder: 'Enter your email or phone number',
        icon: CiUser
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        icon: CiLock,
        eye: FaRegEye,
        eyeSlash: FaRegEyeSlash
    },
]