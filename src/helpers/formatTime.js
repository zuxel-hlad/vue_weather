export default (timestamp, lang = 'en-EN') => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit', hour12: false })
}
