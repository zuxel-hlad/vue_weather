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
                    <AppButton @click="isSevenDayForecast = false" class="home-page__controls-btn" :class="{ 'home-page__controls-btn_active': !isSevenDayForecast }">{{
                        $t('chart.hourly')
                    }}</AppButton>
                    <AppButton @click="isSevenDayForecast = true" class="home-page__controls-btn" :class="{ 'home-page__controls-btn_active': isSevenDayForecast }">
                        {{ $t('chart.fiveDays') }}
                    </AppButton>
                </div>
                <Transition>
                    <WeatherChart
                        v-if="!isSevenDayForecast"
                        :forecast="store.hourlyForecast"
                        :id="chartId"
                        :y-axis-Label="$t('chart.yAxisLabelOneDay')"
                        :x-axis-label="$t('chart.xAxisLabelOneDay')"
                    />
                </Transition>

                <Transition>
                    <WeatherChart
                        v-if="isSevenDayForecast"
                        :forecast="store.fiveDayForecast"
                        :id="chartId"
                        :y-axis-Label="$t('chart.yAxisLabelFiveDays')"
                        :x-axis-label="$t('chart.xAxisLabelFiveDays')"
                    />
                </Transition>
            </div>
        </section>
    </div>
    <AppModal v-model="store.citiesCountAlert">
        <AppAlert @close-alert="store.citiesCountAlert = false">
            <template #title>{{ $t('appAlert.title') }}</template>
            <template #description>{{ $t('appAlert.descriptionCitiesLimit') }}</template>
        </AppAlert>
    </AppModal>
    <AppModal v-model="store.favoritesCountAlert">
        <AppAlert @close-alert="store.favoritesCountAlert = false">
            <template #title>{{ $t('appAlert.title') }}</template>
            <template #description>{{ $t('appAlert.descriptionFavoritesLimit') }}</template>
        </AppAlert>
    </AppModal>
    <AppModal v-model="store.deleteAlert">
        <AppAlert controls @close-alert="store.deleteAlert = false" @confirm="store.confirmDeleteCity" @cancel="store.deleteAlert = false">
            <template #title>{{ $t('appAlert.title') }}</template>
            <template #description>{{ $t('appAlert.descriptionCityDelete') }}</template>
        </AppAlert>
    </AppModal>
    <ErrorAlert v-if="store.error.length" :message="store.error" @close="store.error = ''" />
</template>

<script setup>
import WeatherList from '@/components/Weather-List/WeatherList.vue'
import SearchForm from '@/components/Search-Form/SearchForm.vue'
import WeatherChart from '@/components/WeatherChart/WeatherChart.vue'
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
