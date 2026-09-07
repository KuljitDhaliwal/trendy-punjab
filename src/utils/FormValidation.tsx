const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/



export function handleFormValidation(email: string){
    let isValid: boolean = false
    const pass = regex.test(email)
    if(pass){
        isValid = true
    }
    return isValid
}
