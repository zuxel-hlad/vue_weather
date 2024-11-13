import { defineStore } from 'pinia'
import { api } from '@/api'

export const useUserStore = defineStore('user', {
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
                if (!city) throw new Error('Failed to get city.')

                const response = await api.getCityByName(city)
                if (!response || !response.main?.temp) {
                    throw new Error('Failed to get weather.')
                }

                this.city = city
                this.temp = Math.round(response.main?.temp)
            } catch (e) {
                this.error = true
                this.errorMessage = e?.message || 'An unknown error has occurred.'
            } finally {
                this.loading = false
            }
        },
    },
})
