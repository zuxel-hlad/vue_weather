import i18n from '@/i18n'
export default (timestamp) => {
    const locale = i18n.global.locale

    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString(`${locale === 'en' ? 'en-EN' : 'uk-UA'}`, { hour: '2-digit', minute: '2-digit', hour12: false })
}
