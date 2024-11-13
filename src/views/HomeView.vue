<template>
    <div class="home-page">
        <section class="section">
            <div class="container">
                <SearchForm class="home-page__search" @search="store.addNewCity" />
                <weather-list :cities="store.cities" @delete-item="store.deleteCity" @set-favorite="store.toggleIsFavorite" @view-chart="(id) => console.log(id)" />
                <span v-if="!store.loading && !store.cities.length" class="message">No cities founded.</span>
            </div>
            <AppLoader v-if="store.loading" />
        </section>
        <section v-if="store.hourlyForecast.length" class="section">
            <div class="container">
                <WeatherChart :forecast="store.hourlyForecast" />
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
import { useCitiesStore } from '@/stores/cities'
import { onMounted } from 'vue'

const store = useCitiesStore()

onMounted(() => {
    store.getFavoriteCities()
    store.getDefaultCity()
    store.getCityHourlyForecast('kharkiv')
})
</script>
<style lang="scss">
.home-page {
    &__search {
        margin-bottom: 50px;
    }
}
</style>
