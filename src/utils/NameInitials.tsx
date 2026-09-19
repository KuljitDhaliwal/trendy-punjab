export const nameInitials = (customerName: string) => {
    return customerName.split(" ").map(name => name[0]).join("")
}