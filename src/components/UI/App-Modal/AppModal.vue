<template>
    <Transition>
        <div v-if="modelValue" class="modal" @click="$emit('update:modelValue', false)">
            <slot />
        </div>
    </Transition>
</template>
<script setup>
defineProps({ modelValue: Boolean })
defineEmits(['update:modelValue'])
</script>
<style lang="scss">
.modal {
    width: 100vw;
    height: 100vh;
    padding: 0 15px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
