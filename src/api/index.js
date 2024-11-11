import axios from 'axios'
import { BASE_URL, API_KEY } from '@/constants'
const lang = 'ua'
export const api = {
    getCityByName: async (name) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/weather?q=${name}&units=metric&appid=${API_KEY}&lang=${lang}`,
            )
            return response.data
        } catch (e) {
            throw Error(e)
        }
    },
    getUserWeather: async () => {
        try {
            const {
                data: { city },
            } = await axios.get('https://ipwho.is')
            return city
        } catch (e) {
            throw Error(e)
        }
    },
}
