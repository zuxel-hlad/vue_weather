<template>
    <div class="favorites">
        <section class="section">
            <div class="container">
                <weather-list :cities="cities" />
                <span v-if="!cities.length" class="message">No Favorite cities founded.</span>
            </div>
        </section>
    </div>
</template>

<script setup>
import WeatherList from '@/components/Weather-List/WeatherList.vue'
import { useCitiesStore } from '@/stores/cities'
import { onMounted, computed } from 'vue'
const store = useCitiesStore()

const cities = computed(() => {
    return store.favoriteCities
})

onMounted(() => {
    store.getFavoriteCities()
})
</script>

<style lang="scss"></style>
