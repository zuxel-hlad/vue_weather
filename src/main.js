import '@/assets/scss/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import components from '@/components/UI'
import router from './router'
import i18n from './i18n'

const app = createApp(App)
components.forEach((component) => {
    app.component(component.__name, component)
})
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
