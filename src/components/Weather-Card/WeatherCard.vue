<template>
    <div class="card">
        <div v-if="$route.path !== '/favorites'" class="card__controls">
            <button type="button" :class="{ card__btn_favorite: city?.isFavorite }" class="card__btn" title="Add to favorites" @click="$emit('set-favorite')">
                <i class="fa-solid fa-star"></i>
            </button>
            <button type="button" class="card__btn" title="Delete item" @click="$emit('delete-item')">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="card__content">
            <h3 class="card__content-title">{{ city?.name ?? '-' }}</h3>
            <span class="card__content-description">{{ city?.temp && city?.temp > 0 ? `+${city.temp}` : `${city.temp}` }}</span>
        </div>
    </div>
</template>
<script setup>
defineEmits(['delete-item', 'set-favorite'])
defineProps({
    city: {
        type: Object,
        required: true,
        default: () => ({}),
    },
})
</script>
<style lang="scss">
.card {
    width: 100%;
    border-radius: 6px;
    min-height: 220px;
    padding: 20px;
    border: 1px solid $teal;
    position: relative;
    flex-shrink: 0;
    text-align: center;
    display: flex;
    flex-direction: column;

    &__controls {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    &__btn {
        padding: 10px;
        font-size: 16px;
        color: $teal;
        transition: opacity 0.2s;

        @media (hover: hover) {
            &:hover {
                opacity: 0.5;
            }
        }

        &:active {
            opacity: 0.5;
        }

        &_favorite {
            color: $gold;
        }
    }

    &__content {
        width: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &-title {
            font-size: 22px;
            font-weight: 700;
        }

        &-description {
            font-size: 18px;
            font-weight: 500;
        }
    }
}
</style>
