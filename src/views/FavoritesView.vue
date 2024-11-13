<template>
    <div class="favorites">
        <section class="section">
            <div class="container">
                <weather-list :cities="store.favoriteCities" />
                <span v-if="!store.favoriteCities.length" class="message">No Favorite cities founded.</span>
            </div>
        </section>
    </div>
</template>

<script setup>
import WeatherList from '@/components/Weather-List/WeatherList.vue'
import { useCitiesStore } from '@/stores/cities'
import { onMounted } from 'vue'
const store = useCitiesStore()

onMounted(() => {
    store.getFavoriteCities()
})
</script>

<style lang="scss"></style>
