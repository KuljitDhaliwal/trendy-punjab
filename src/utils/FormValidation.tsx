const regex = /^(?:\d{10}|[a-zA-Z0-9_.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/i;


export function handleFormValidation(email: string){
    return regex.test(email)
}
