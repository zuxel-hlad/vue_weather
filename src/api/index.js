import axios from 'axios'
import { BASE_URL, API_KEY, USER_LOCATION_URL } from '@/constants'

const apiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        units: 'metric',
        appid: API_KEY,
    },
})

export const api = {
    getCityByName: async (name, lang = 'ua') => {
        try {
            const { data } = await apiClient.get('/weather', {
                params: { q: name, lang },
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
}
