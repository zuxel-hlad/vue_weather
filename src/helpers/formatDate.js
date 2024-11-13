export default (timestamp) => {
    const date = new Date(timestamp * 1000)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayOfWeek = daysOfWeek[date.getDay()]
    const day = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
    })
    return `${dayOfWeek}: ${day}`
}
