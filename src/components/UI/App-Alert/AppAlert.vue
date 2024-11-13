<template>
    <div class="alert" @click.stop>
        <button type="button" class="alert__close" @click="$emit('close-alert')">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <h3 class="alert__title">Attention!</h3>
        <p class="alert__description">The limit for adding cities has been reached. Delete one to add a new one.</p>
        <div class="alert__controls" v-if="controls">
            <AppButton @click="$emit('confirm')" type="button" class="alert__controls-btn" warning>Ok </AppButton>
            <AppButton @click="$emit('cancel')" type="button" class="alert__controls-btn">Cancel </AppButton>
        </div>
    </div>
</template>
<script setup>
import AppButton from '@/components/UI/App-Button/App-Button.vue'

defineProps({
    controls: {
        type: Boolean,
        required: false,
        default: false,
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

    &__close {
        position: absolute;
        /* border: 1px solid black; */
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
