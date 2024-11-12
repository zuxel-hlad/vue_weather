<template>
    <div class="weather-list">
        <!-- <div class="weather-list__placeholder weather-list__card">
            <button
                type="button"
                title="add new city"
                @click="$emit('add-one')"
            >
                <i class="fa-solid fa-circle-plus"></i>
            </button>
        </div> -->
        <WeatherCard
            @delete-item="$emit('delete-item', city.id)"
            @set-favorite="$emit('set-favorite', city.id)"
            class="weather-list__card"
            v-for="city in cities"
            :city="city"
            :key="city.id"
        />
    </div>
</template>
<script setup>
import WeatherCard from '@/components/Weather-Card/WeatherCard.vue'

defineEmits(['add-one', 'set-favorite', 'delete-item'])

defineProps({
    cities: {
        type: Array,
        required: true,
        default: () => [],
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

    &__placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        min-height: 220px;
        padding: 20px;
        border: 1px solid $teal;
        position: relative;
        flex-shrink: 0;
        text-align: center;

        i {
            display: block;
            font-size: 50px;
            color: $teal;
        }
    }

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
