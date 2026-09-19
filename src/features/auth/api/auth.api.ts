import {api} from '../../../utils/api.ts'

type Login = {
    email: string,
    password: string
}

export const getLogin = (data: Login) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(data)
    }
    return api('auth/login', options)
}


export const getRefreshToken = () => {
    const options = {
        method: 'POST',
    }
    return api('auth/refresh', options)
}


export const getLogout = () => {
    const options = {
        method: 'POST'
    }
    return api('auth/logout', options)
}