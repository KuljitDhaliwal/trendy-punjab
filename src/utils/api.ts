const API_URL = import.meta.env.VITE_API_URL
console.log("API_URL =", API_URL);
export const api = async(endPoint: string, options: RequestInit = {}) => {

    const response = await fetch(`${API_URL}${endPoint}`, {
        ...options,
        headers: {
            'Content-type': 'application/json',
        },
        credentials: "include"
    })

    if(!response.ok){
        throw new Error(`Invalid email or password!`)
    }

    const data = await response.json()
    console.log('Data from API', data)
    return data

}