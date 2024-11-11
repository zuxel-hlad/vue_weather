import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [],
    }),
})
