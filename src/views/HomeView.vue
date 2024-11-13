<template>
    <div class="home-page">
        <section class="section">
            <div class="container">
                <SearchForm class="home-page__search" @search="store.addNewCity" />
                <weather-list :cities="store.cities" @delete-item="store.deleteCity" @set-favorite="store.toggleIsFavorite" @view-chart="goToChart" />
                <span v-if="!store.loading && !store.cities.length" class="message">No cities founded.</span>
            </div>
            <AppLoader v-if="store.loading" />
        </section>
        <section class="section">
            <div class="container">
                <div class="home-page__controls">
                    <AppButton @click="isSevenDayForecast = false" class="home-page__controls-btn" :class="{ 'home-page__controls-btn_active': !isSevenDayForecast }"
                        >5 days</AppButton
                    >
                    <AppButton @click="isSevenDayForecast = true" class="home-page__controls-btn" :class="{ 'home-page__controls-btn_active': isSevenDayForecast }"
                        >7 days</AppButton
                    >
                </div>
                <Transition>
                    <WeatherChart v-if="!isSevenDayForecast" :forecast="store.hourlyForecast" :id="chartId" y-label="Temperature (°C)" x-label="Time" />
                </Transition>

                <Transition>
                    <WeatherChart v-if="isSevenDayForecast" :forecast="store.fiveDayForecast" :id="chartId" y-label="Temperature (°C)" x-label="Date" />
                </Transition>
            </div>
        </section>
    </div>
    <AppModal v-model="store.countAlert">
        <AppAlert @close-alert="store.countAlert = false" />
    </AppModal>
    <AppModal v-model="store.deleteAlert">
        <AppAlert controls @close-alert="store.deleteAlert = false" @confirm="store.confirmDeleteCity" @cancel="store.deleteAlert = false" />
    </AppModal>
    <ErrorAlert v-if="store.error.length" :message="store.error" @close="store.error = ''" />
</template>

<script setup>
import WeatherList from '@/components/Weather-List/WeatherList.vue'
import SearchForm from '@/components/Search-Form/SearchForm.vue'
import AppModal from '@/components/UI/App-Modal/AppModal.vue'
import AppAlert from '@/components/UI/App-Alert/AppAlert.vue'
import AppLoader from '@/components/UI/App-Loader/AppLoader.vue'
import ErrorAlert from '@/components/UI/Error-ALert/ErrorAlert.vue'
import WeatherChart from '@/components/WeatherChart/WeatherChart.vue'
import AppButton from '@/components/UI/App-Button/App-Button.vue'
import { useCitiesStore } from '@/stores/cities'
import { onMounted, ref } from 'vue'
import { DEFAULT_CITY } from '@/constants'
import generateId from '@/helpers/generateId'

const isSevenDayForecast = ref(false)
const chartId = generateId()

const store = useCitiesStore()

onMounted(() => {
    store.getFavoriteCities()
    store.getDefaultCity()
    if (!store.hourlyForecast.length || !store.fiveDayForecast.length) {
        store.getCityForecast(DEFAULT_CITY)
    }
})

const goToChart = (name) => {
    const chartElement = document.getElementById(chartId)
    if (chartElement) {
        chartElement.scrollIntoView({ block: 'end', behavior: 'smooth' })
        store.getCityForecast(name)
    }
}
</script>
<style lang="scss">
.home-page {
    &__search {
        margin-bottom: 50px;
    }

    &__controls {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 20px;

        &-btn {
            &_active {
                background-color: $teal;
            }
        }
    }
}
</style>
