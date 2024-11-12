<template>
    <section class="home-page">
        <div class="container">
            <SearchForm class="home-page__search" />
            <weather-list />
        </div>
    </section>
    <AppModal v-model="modal">
        <AppAlert />
    </AppModal>
</template>

<script setup>
import WeatherList from '@/components/Weather-List/WeatherList.vue'
import SearchForm from '@/components/Search-Form/SearchForm.vue'
import AppModal from '@/components/UI/App-Modal/AppModal.vue'
import AppAlert from '@/components/UI/App-Alert/AppAlert.vue'

import { ref } from 'vue'

const modal = ref(false)
</script>
<style lang="scss">
.home-page {
    &__search {
        margin: 50px 0;
    }
}
</style>
