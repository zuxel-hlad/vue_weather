import '@/assets/scss/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import components from '@/components/UI'
import router from './router'

const app = createApp(App)
components.forEach((component) => {
    app.component(component.__name, component)
})
app.use(createPinia())
app.use(router)
app.mount('#app')
