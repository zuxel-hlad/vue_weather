<template>
    <div class="weather-list">
        <WeatherCard
            @delete-item="$emit('delete-item', city.id)"
            @set-favorite="$emit('set-favorite', city.id)"
            @view-chart="$emit('view-chart', city.id)"
            class="weather-list__card"
            v-for="city in cities"
            :city="city"
            :key="city.id"
        />
    </div>
</template>
<script setup>
import WeatherCard from '@/components/Weather-Card/WeatherCard.vue'

defineEmits(['set-favorite', 'delete-item', 'view-chart'])

defineProps({
    cities: {
        type: Array,
        required: true,
    },
})
</script>
<style lang="scss">
.weather-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 13px;

    &__card {
        width: calc(33.33% - 9px);

        @media screen and (max-width: 768px) {
            width: calc(50% - 7px);
        }

        @media screen and (max-width: 576px) {
            width: 100%;
        }
    }
}
</style>
