<template>
    <section>
        <div class="container">
            weather-list
            <SearchForm />
            <WeatherCard />
        </div>
    </section>
</template>
<script setup>
import WeatherCard from '@/components/Weather-Card/WeatherCard.vue'
import SearchForm from '@/components/Search-Form/SearchForm.vue'
</script>
<style></style>
