<template>
    <header class="header">
        <div class="container header__wrapper">
            <a href="#!" class="header__logo">Wheater App</a>
            <div v-if="!error && !loading" class="header__user-info">
                <span>{{ city }}</span>
                <span>{{ temp > 0 ? `+${temp}` : `${temp}` }}</span>
            </div>
            <span class="header__user-info" v-if="loading">Loading ...</span>
            <span v-if="error">{{ errorMessage }}</span>
        </div>
        <nav class="header__nav">
            <RouterLink to="/">{{ $t('header.home') }}</RouterLink>
            <RouterLink to="/favorites">{{ $t('header.favorites') }}</RouterLink>
            <LangSwitcher />
        </nav>
    </header>
</template>
<script setup>
import LangSwitcher from '@/components/Lang-Swithcer/LangSwitcher.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const store = useUserStore()
const { temp, error, loading, errorMessage, city } = storeToRefs(store)
onMounted(() => {
    store.getUserInfo()
})
</script>
<style lang="scss">
.header {
    padding: 12px 0 0 0;

    &__logo {
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
