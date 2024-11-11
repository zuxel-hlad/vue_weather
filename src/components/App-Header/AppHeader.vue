<template>
    <header class="header">
        <div class="container header__wrapper">
            <a href="#!" class="header__logo">Wheater App</a>
            <div v-if="!error && !loading" class="header__user-info">
                <span>{{ city }}</span>
                <span>{{ temperature }}</span>
            </div>
            <span class="header__user-info" v-if="loading">Loading ...</span>
            <span v-if="error">{{ errorMessage }}</span>
        </div>
        <nav class="header__nav">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/favorites">Favorites</RouterLink>
        </nav>
    </header>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted, computed } from 'vue'
const store = useUserStore()
const { temp, error, loading, errorMessage, city } = storeToRefs(store)

const temperature = computed(() => {
    if (temp.value > 0) {
        return `+${temp.value}`
    } else if (temp.value < 0) {
        return `${temp.value}`
    } else {
        return `${temp.value}`
    }
})

onMounted(() => {
    store.getUserInfo()
})
</script>
<style lang="scss" scoped>
.header {
    padding: 12px 0 0 0;

    &__logo {
        color: $dark;
        font-weight: 700;
        font-size: 32px;
        white-space: nowrap;

        @media screen and (max-width: 576px) {
            font-size: 24px;
        }
    }

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    }

    &__user-info {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 5px;
        font-size: 22px;

        @media screen and (max-width: 576px) {
            font-size: 18px;
        }
    }

    &__nav {
        border-bottom: 1px solid $border-color;
        padding: 12px 0;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 24px;

        & a.router-link-exact-active {
            color: $teal;
        }
    }
}
</style>
