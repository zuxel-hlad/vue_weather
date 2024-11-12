import { defineStore } from 'pinia'
import { api } from '@/api'
import generateId from '@/helpers/generateId'

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [],
        countAlert: false,
        deleteAlert: false,
        deleteItemId: '',
    }),

    actions: {
        addNewCity(city) {
            if (this.cities.length < 5) {
                this.cities.push(city)
            } else {
                this.countAlert = true
            }
        },

        deleteCity(id) {
            this.deleteItemId = id
            this.deleteAlert = true
        },

        confirmDeleteCity() {
            this.cities = this.cities.filter(
                (city) => city.id !== this.deleteItemId,
            )
            this.deleteAlert = false
        },

        toggleIsFavorite(id) {
            this.cities = this.cities.map((city) => {
                if (city.id === id) {
                    console.log('true')
                    return {
                        ...city,
                        isFavorite: !city.isFavorite,
                    }
                } else {
                    return city
                }
            })
            const favorites = this.cities.filter(
                (city) => city.isFavorite === true,
            )
            localStorage.setItem('favorite-cities', JSON.stringify(favorites))
        },

        async getDefaultCity() {
            try {
                const city = await api.getCityByName('kharkiv')
                if (!city) throw new Error('Failed to get city.')

                this.cities.unshift({
                    name: city.name,
                    isFavorite: false,
                    id: generateId(),
                    temp: Math.round(city.main.temp),
                })
            } catch (e) {
                console.error(e)
            }
        },
    },
})
