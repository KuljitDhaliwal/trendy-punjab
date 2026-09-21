import { store } from "../store/Store"

const API_URL = import.meta.env.VITE_API_URL

export const api = async(endPoint: string, options: RequestInit = {}) => {
    const token = store.getState().auth.accessToken
    const response = await fetch(`${API_URL}${endPoint}`, {
        ...options,
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: "include"
    })

    const data = await response.json()
    
    if(!response.ok){
        throw new Error(data.message || "Something went wrong")
    }

    console.log('Data from API', data)
    return data

}