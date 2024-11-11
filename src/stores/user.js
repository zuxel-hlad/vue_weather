import { defineStore } from 'pinia'
import { api } from '@/api'

export const useUserStore = defineStore('cities', {
    state: () => ({
        city: '-',
        temp: 0,
        error: false,
        errorMessage: '',
        loading: false,
    }),
    actions: {
        async getUserInfo() {
            this.loading = true
            this.error = false
            this.errorMessage = ''

            try {
                const city = await api.getUserWeather()
                const {
                    main: { temp },
                } = await api.getCityByName(city)

                if (!city || !temp) {
                    throw new Error('Something goes wrong...')
                }

                this.city = city
                this.temp = Math.round(temp)
            } catch (e) {
                this.error = true
                if (typeof e === 'object' && 'message' in e) {
                    this.errorMessage = e.message
                } else {
                    this.errorMessage = e
                }
            } finally {
                this.loading = false
            }
        },
    },
})
