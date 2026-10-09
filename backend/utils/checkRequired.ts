export const checkRequired  = (data: any, schema: any) => {
    const requiredFields: any = {}
    const phoneRegex = /^[6-9]\d{9}$/
    for(const key of Object.keys(schema.schema.paths)){
        const field = schema.schema.paths[key]
        if(field.isRequired){
            if(key === 'productCode' ||
                key === 'orderNumber'
            )continue
            if(data[key] === "" || data[key] == null){
                requiredFields[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`
            }
            if(Object.keys(data).includes(key) && key === 'phone'){
                if(!phoneRegex.test(data[key])){
                    requiredFields[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is invalid!`
                }
            }
        }
    }
    return requiredFields
}