<template>
    <select @change="onSwitchLang" class="">
        <option value="en" :selected="i18n.global.locale === 'en'">en</option>
        <option value="ua" :selected="i18n.global.locale === 'ua'">ua</option>
    </select>
</template>
<script setup>
import i18n from '@/i18n'
import { onBeforeMount } from 'vue'

const onSwitchLang = (e) => {
    i18n.global.locale = e.target.value
    localStorage.setItem('lang', i18n.global.locale)
}

onBeforeMount(() => {
    const lang = localStorage.getItem('lang')
    if (lang) {
        i18n.global.locale = lang
    }
})
</script>
