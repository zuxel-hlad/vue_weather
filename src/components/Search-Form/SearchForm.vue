<template>
    <form class="search-form" @submit.prevent="onSearch">
        <div class="search-form__wrapper">
            <label class="search-form__label">
                <span>{{ $t('searchForm.label') }}</span>
                <input v-model="searchValue" :class="{ 'search-form__input_error': validateError }" class="search-form__input" type="text" id="search" list="search-list" />
                <datalist id="search-list" class="search-form__list">
                    <option v-for="(city, idx) in citiesList" :value="city" :key="idx">
                        {{ city }}
                    </option>
                </datalist>
            </label>
            <AppButton type="submit" :class="{ 'search-form__submit_error': validateError }" class="search-form__submit">{{ $t('searchForm.button') }}</AppButton>
        </div>
        <span v-if="validateError" class="search-form__helper-text">{{ $t('searchForm.error') }}</span>
    </form>
</template>
<script setup>
import { citiesEn, citiesUa } from './fakeCities'
import { defineModel, ref, watch, computed } from 'vue'
import i18n from '@/i18n'

const validateError = ref(false)

const searchValue = defineModel({ default: '' })

const emit = defineEmits(['search'])

const onSearch = () => {
    if (searchValue.value && searchValue.value.length) {
        emit('search', searchValue.value)
        searchValue.value = ''
    } else {
        validateError.value = true
    }
}

const citiesList = computed(() => {
    return i18n.global.locale === 'en' ? citiesEn : citiesUa
})

watch(searchValue, () => {
    if (validateError.value && searchValue.value.length >= 1) {
        validateError.value = false
    }
})
</script>
<style lang="scss">
.search-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &__wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }

    &__label {
        width: 100%;
    }

    &__input {
        width: 100%;
        border: 1px solid $teal;
        border-right: none;
        border-radius: 6px 0 0 6px;
        padding: 10px 12px;
        height: 46px;

        &_error {
            border-color: $red;
            color: $red;
        }
    }

    &__submit {
        border-radius: 0 6px 6px 0;

        &_error {
            border-color: $red;
            border-color: $red;
            color: $red;
        }
    }

    &__helper-text {
        display: block;
        color: $red;
    }
}
</style>
