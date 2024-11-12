<template>
    <section class="home-page">
        <div class="container">
            <SearchForm class="home-page__search" />
            <weather-list
                :cities="store.cities"
                @add-one="onCityAdd"
                @delete-item="store.deleteCity"
                @set-favorite="store.toggleIsFavorite"
            />
        </div>
    </section>
    <AppModal v-model="store.countAlert">
        <AppAlert @close-alert="store.countAlert = false" />
    </AppModal>
    <AppModal v-model="store.deleteAlert">
        <AppAlert
            controls
            @close-alert="store.deleteAlert = false"
            @confirm="store.confirmDeleteCity"
            @cancel="store.deleteAlert = false"
        />
    </AppModal>
</template>

<script setup>
import WeatherList from '@/components/Weather-List/WeatherList.vue'
import SearchForm from '@/components/Search-Form/SearchForm.vue'
import AppModal from '@/components/UI/App-Modal/AppModal.vue'
import AppAlert from '@/components/UI/App-Alert/AppAlert.vue'
import { useCitiesStore } from '@/stores/cities'
import generateId from '@/helpers/generateId'
import { onMounted } from 'vue'

const store = useCitiesStore()

const onCityAdd = () => {
    store.addNewCity({
        id: generateId(),
        name: 'test',
        temp: '+24',
        isFavorite: false,
    })
}

onMounted(() => {
    store.getDefaultCity()
})
</script>
<style lang="scss">
.home-page {
    &__search {
        margin: 50px 0;
    }
}
</style>
