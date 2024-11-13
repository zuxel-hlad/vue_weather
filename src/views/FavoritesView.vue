<template>
    <div class="favorites">
        <section class="section">
            <div class="container">
                <weather-list :cities="store.favoriteCities" @set-favorite="(id) => store.deleteCity(id, FAVORITES)" />
                <span v-if="!store.favoriteCities.length" class="message">No Favorite cities founded.</span>
            </div>
        </section>
    </div>
    <AppModal v-model="store.deleteAlert">
        <AppAlert controls @close-alert="store.deleteAlert = false" @confirm="store.confirmDeleteCity(FAVORITES)" @cancel="store.deleteAlert = false">
            <template #title>{{ $t('appAlert.title') }}</template>
            <template #description>{{ $t('appAlert.descriptionFavoriteDelete') }}</template>
        </AppAlert>
    </AppModal>
</template>

<script setup>
import WeatherList from '@/components/Weather-List/WeatherList.vue'
import { FAVORITES } from '@/constants'
import { useCitiesStore } from '@/stores/cities'
import { onMounted } from 'vue'
const store = useCitiesStore()

onMounted(() => {
    store.getFavoriteCities()
})
</script>

<style lang="scss"></style>
