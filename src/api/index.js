import axios from 'axios'
import { BASE_URL, API_KEY, USER_LOCATION_URL } from '@/constants'

const apiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        appid: API_KEY,
        units: 'metric',
        lang: 'ua',
    },
})

export const api = {
    getCityByName: async (name) => {
        try {
            const { data } = await apiClient.get('/weather', {
                params: { q: name },
            })
            return data
        } catch (error) {
            console.error('Error getting weather:', error.message)
            throw error
        }
    },

    getUserWeather: async () => {
        try {
            const { data } = await axios.get(USER_LOCATION_URL)
            return data?.city
        } catch (error) {
            console.error('Error when determining city:', error.message)
            throw error
        }
    },

    getForecast: async (name) => {
        try {
            const { data } = await apiClient.get('/forecast', {
                params: { q: name },
            })
            return data
        } catch (error) {
            console.error('Error getting forecast:', error.message)
            throw error
        }
    },
}
