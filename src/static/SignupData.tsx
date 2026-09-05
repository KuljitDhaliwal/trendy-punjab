import type { IconType } from "react-icons";
import { CiUser, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


export type Data = {
    label: string,
    name: string,
    placeholder: string,
    icon: IconType,
    eye?: IconType | undefined,
    eyeSlash?: IconType | undefined
}


    export const SignupData: Data[] = [
        {
            label: 'Email or Mobile Number',
            name: 'email',
            placeholder: 'Enter your email or password',
            icon: CiUser
        },
        {
            label: 'Password',
            name: 'password',
            placeholder: 'Create a password',
            icon: CiLock,
            eye: FaRegEye,
            eyeSlash: FaRegEyeSlash
        },
        {
            label: 'Confirm Password',
            name: 'confirmPassword',
            placeholder: 'Confirm your password',
            icon: CiLock,
            eye: FaRegEye,
            eyeSlash: FaRegEyeSlash
        }
    ]