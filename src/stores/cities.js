import { defineStore } from 'pinia'
import { api } from '@/api'
import { DEFAULT_CITY } from '@/constants'
import generateId from '@/helpers/generateId'
import formatTime from '@/helpers/formatTime'

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [],
        hourlyForecast: [],
        favoriteCities: [],
        countAlert: false,
        deleteAlert: false,
        deleteItemId: '',
        chartItemId: '',
        loading: false,
        error: '',
    }),

    getters: {
        checkIsFavorite(state) {
            return (cityName) => state.favoriteCities.some((item) => item.name === cityName && item.isFavorite)
        },
        isCityExist(state) {
            return (name) => state.cities.some((city) => city.name === name)
        },
    },

    actions: {
        deleteCity(id) {
            this.deleteItemId = id
            this.deleteAlert = true
        },

        confirmDeleteCity() {
            this.cities = this.cities.filter((city) => city.id !== this.deleteItemId)
            this.deleteAlert = false
        },

        toggleIsFavorite(id) {
            this.cities = this.cities.map((city) => {
                if (city.id === id) {
                    if (!this.favoriteCities.some((item) => item.id === id)) {
                        this.favoriteCities.push({
                            ...city,
                            isFavorite: !city.isFavorite,
                        })
                    } else {
                        this.favoriteCities = this.favoriteCities.filter((item) => item.id !== id)
                    }

                    return {
                        ...city,
                        isFavorite: !city.isFavorite,
                    }
                } else {
                    return city
                }
            })
            localStorage.setItem('favorite-cities', JSON.stringify(this.favoriteCities))
        },

        getFavoriteCities() {
            const saved = JSON.parse(localStorage.getItem('favorite-cities'))
            if (saved && saved.length) {
                this.favoriteCities = saved
            } else {
                localStorage.setItem('favorite-cities', JSON.stringify([]))
            }
        },

        async getCityHourlyForecast(name) {
            this.loading = true
            try {
                const forecast = await api.getHourlyForecast(name)
                const today = new Date().toISOString().split('T')[0]

                this.hourlyForecast = forecast.list.reduce((acc, item) => {
                    const forecastDate = new Date(item.dt * 1000).toISOString().split('T')[0]
                    if (forecastDate === today) {
                        acc.push({
                            time: formatTime(item.dt),
                            temp: Math.round(item.main.temp),
                        })
                    }
                    return acc
                }, [])
            } catch (error) {
                console.error(error.message)
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        async addNewCity(name) {
            if (this.isCityExist(name)) {
                this.error = 'City Already exist.'
                return
            }
            this.loading = true
            try {
                const city = await api.getCityByName(name)
                if (this.cities.length < 5) {
                    this.cities.push({
                        name: city.name,
                        isFavorite: this.checkIsFavorite(city.name),
                        id: generateId(),
                        temp: Math.round(city.main.temp),
                    })
                } else {
                    this.countAlert = true
                }
            } catch (e) {
                console.error(e.message)
                this.error = e.message
            } finally {
                this.loading = false
            }
        },

        async getDefaultCity() {
            if (this.cities.length) return

            this.error = ''
            this.loading = true
            try {
                const city = await api.getCityByName(DEFAULT_CITY)
                this.cities.push({
                    name: city.name,
                    isFavorite: this.checkIsFavorite(city.name),
                    id: generateId(),
                    temp: Math.round(city.main.temp),
                })
            } catch (e) {
                console.error(e.message)
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
    },
})
