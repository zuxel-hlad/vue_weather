import { defineStore } from 'pinia'
import asyncActions from './asyncActions'

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [],
        hourlyForecast: [],
        fiveDayForecast: [],
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

        toggleIsFavorite(id, handleRemove = false) {
            if (id && handleRemove) {
                this.favoriteCities = this.favoriteCities.filter((item) => item.id !== id)
            }

            if (this.favoriteCities.length >= 5) {
                this.countAlert = true
                return
            }

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

        ...asyncActions,
    },
})
