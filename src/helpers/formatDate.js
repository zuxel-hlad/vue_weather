import i18n from '@/i18n'
export default (timestamp) => {
    const locale = i18n.global.locale
    const date = new Date(timestamp * 1000)
    const daysOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const daysOfWeekUa = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

    if (locale === 'ua') {
        const dayOfWeekUa = daysOfWeekUa[date.getDay()]
        console.log(`${locale}-${locale.toUpperCase()}`)
        const day = date.toLocaleDateString(`${locale}-${locale.toUpperCase()}`, {
            day: '2-digit',
            month: '2-digit',
        })
        return `${dayOfWeekUa}: ${day}`
    }

    if (locale === 'en') {
        const dayOfWeekEn = daysOfWeekEn[date.getDay()]
        const day = date.toLocaleDateString(`${locale}-${locale.toUpperCase()}`, {
            day: '2-digit',
            month: '2-digit',
        })
        return `${dayOfWeekEn}: ${day}`
    }
}
