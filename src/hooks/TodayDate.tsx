export const useTodayDate = () => {
    const today = new Date()
    const date = today.toLocaleDateString()
    return {date}
}