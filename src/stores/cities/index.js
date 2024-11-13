import { defineStore } from 'pinia'
import asyncActions from './asyncActions'
import { CITIES, FAVORITES } from '@/constants'

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [],
        hourlyForecast: [],
        fiveDayForecast: [],
        favoriteCities: [],
        citiesCountAlert: false,
        favoritesCountAlert: false,
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
        deleteCity(id, source = CITIES) {
            if (source === CITIES) {
                this.deleteItemId = id
                this.deleteAlert = true
            }

            if (source === FAVORITES) {
                this.deleteItemId = id
                this.deleteAlert = true
                console.log(id, this.deleteItemId)
            }
        },

        confirmDeleteCity(source = CITIES) {
            if (source === CITIES) {
                this.cities = this.cities.filter((city) => city.id !== this.deleteItemId)
            }

            if (source === FAVORITES) {
                console.log(source)
                this.favoriteCities = this.favoriteCities.filter((city) => city.id !== this.deleteItemId)
                this.cities = this.cities.map((city) => {
                    if (city.id === this.deleteItemId) {
                        return {
                            ...city,
                            isFavorite: !city.isFavorite,
                        }
                    } else {
                        return city
                    }
                })
                localStorage.setItem('favorite-cities', JSON.stringify(this.favoriteCities))
            }

            this.deleteAlert = false
        },

        toggleIsFavorite(id) {
            if (id) {
                this.favoriteCities = this.favoriteCities.filter((item) => item.id !== id)
            }

            if (this.favoriteCities.length >= 5) {
                this.favoritesCountAlert = true
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
