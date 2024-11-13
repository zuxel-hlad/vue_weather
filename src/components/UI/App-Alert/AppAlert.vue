<template>
    <div class="alert" @click.stop>
        <button type="button" class="alert__close" @click="$emit('close-alert')">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <h3 class="alert__title"><slot name="title" /></h3>
        <p class="alert__description"><slot name="description" /></p>
        <div class="alert__controls" v-if="controls">
            <AppButton @click="$emit('confirm')" type="button" class="alert__controls-btn" warning>{{ $t('appAlert.okBtn') }}</AppButton>
            <AppButton @click="$emit('cancel')" type="button" class="alert__controls-btn">{{ $t('appAlert.cancelBtn') }}</AppButton>
        </div>
    </div>
</template>
<script setup>
defineProps({
    controls: {
        type: Boolean,
        required: false,
    },
})

defineEmits(['confirm', 'cancel', 'close-alert'])
</script>
<style lang="scss">
.alert {
    position: relative;
    border-radius: 12px;
    padding: 20px;
    width: 100%;
    max-width: 700px;
    background-color: $white;

    @media (prefers-color-scheme: dark) {
        color: $white;
        background-color: $dark;
        border: 1px solid $teal;
    }

    @media (prefers-color-scheme: light) {
        color: $dark;
        background-color: $white;
    }

    &__close {
        position: absolute;
        top: -3px;
        right: 5px;
        padding: 10px;
        font-size: 20px;
    }

    &__title {
        font-size: 36px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 12px;
    }

    &__description {
        font-size: 18px;
        text-align: center;
        margin-bottom: 12px;
    }

    &__controls {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 20px;

        &-btn {
            min-width: 90px;
            padding: 12.5px 20px;
        }
    }
}
</style>
