<template>
    <div class="error-alert">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p>{{ message }}</p>

        <button type="button" class="error-alert__close" @click="$emit('close')">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
</template>
<script setup>
defineEmits(['close'])

defineProps({
    message: {
        type: String,
        required: true,
        default: 'Ooops... Something goes wrong.',
    },
})
</script>
<style lang="scss">
.error-alert {
    position: fixed;
    top: 15px;
    right: 0;
    padding: 30px 60px 30px 30px;
    display: flex;
    width: max-content;
    border-radius: 6px;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    background-color: $red;

    &__close {
        position: absolute;
        top: 50%;
        translate: 0% -50%;
        right: 10px;
        padding: 10px;
        font-size: 18px;
    }
}
</style>
