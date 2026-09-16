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
        method: 'GET',
    }
    return api('auth/refresh', options)
}