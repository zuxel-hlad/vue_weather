import { createI18n } from 'vue-i18n'
import ua from './locales/ua'
import en from './locales/en'

const i18n = createI18n({
    locale: 'en',
    messages: { ua, en },
})

export default i18n
