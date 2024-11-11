<template>
    <AppHeader />
    <main>
        <RouterView />
    </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/App-Header/AppHeader.vue'
</script>
