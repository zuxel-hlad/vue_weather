import { api } from '@/api'
import { DEFAULT_CITY } from '@/constants'
import generateId from '@/helpers/generateId'
import formatTime from '@/helpers/formatTime'
import formatDate from '@/helpers/formatDate'

export default {
    async getCityForecast(name) {
        this.loading = true
        try {
            const forecast = await api.getForecast(name)
            const hourlyForecastChartData = (data) => {
                const today = new Date().toISOString().split('T')[0]

                const hourlyForecast = data.list.reduce((acc, item) => {
                    const forecastDate = new Date(item.dt * 1000).toISOString().split('T')[0]

                    if (forecastDate === today) {
                        acc.push({
                            label: formatTime(item.dt),
                            temp: Math.round(item.main.temp),
                        })
                    }
                    return acc
                }, [])

                return hourlyForecast
            }
            const fiveDaysForecastChartData = (data) => {
                const dailyData = {}
                data.list.forEach((item) => {
                    const date = formatDate(item.dt)
                    if (!dailyData[date]) {
                        dailyData[date] = { sum: 0, count: 0 }
                    }
                    dailyData[date].sum += item.main.temp
                    dailyData[date].count += 1
                })

                const labels = Object.keys(dailyData).slice(0, 5)
                const temperatures = labels.map((date) => (dailyData[date].sum / dailyData[date].count).toFixed(1))

                return labels.map((item, idx) => ({
                    label: item,
                    temp: temperatures[idx],
                }))
            }

            this.hourlyForecast = hourlyForecastChartData(forecast)
            this.fiveDayForecast = fiveDaysForecastChartData(forecast)
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
                this.citiesCountAlert = true
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
}
