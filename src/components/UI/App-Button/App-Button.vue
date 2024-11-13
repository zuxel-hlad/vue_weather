<template>
    <button class="app-button" :class="{ 'app-button_warning': warning }">
        <slot />
    </button>
</template>
<script setup>
defineProps({
    warning: {
        type: Boolean,
        required: false,
    },
})
</script>
<style lang="scss">
.app-button {
    display: block;
    padding: 12.5px 40px;
    white-space: nowrap;
    border: 1px solid $teal;
    border-radius: 6px;
    transition: background-color 0.2s;
    text-align: center;

    @media (hover: hover) {
        &:hover {
            background-color: $teal;
        }
    }

    &:active {
        background-color: $teal;
    }

    &_warning {
        @media (hover: hover) {
            &:hover {
                background-color: $red;
                border-color: $red;
            }

            &:active {
                background-color: $red;
                border-color: $red;
            }
        }
    }
}
</style>
