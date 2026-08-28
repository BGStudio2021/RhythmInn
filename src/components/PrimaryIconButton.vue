<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon: string,
        iconSize?: string
    }>(),
    {
        iconSize: 'normal'
    }
)
</script>
<template>
    <button class="primary-icon-button" :class="{ 'primary-icon-button-small': iconSize === 'small' }">
        <img :src="icon">
    </button>
</template>
<style scoped>
.primary-icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    background: var(--indigo-primary);
    padding: 6px;
}

.primary-icon-button:hover {
    outline: 2px solid var(--border-dark-dynamic);
    transition: background 1s var(--easeOutCirc);
}

.primary-icon-button:active {
    background: rgba(255, 255, 255, 0.6);
    color: #000;
    transition: 0s;
}

.primary-icon-button-small {
    padding: 8px;
}

.primary-icon-button img {
    width: 28px;
    height: 28px;
    opacity: 0.8;
    filter: invert(1);
    transition: 1s var(--easeOutCirc);
}

.primary-icon-button-small img {
    width: 24px;
    height: 24px;
}

.primary-icon-button:active img {
    filter: none;
    transition: 0s;
}

.primary-icon-button:disabled {
    opacity: 0.6;
    pointer-events: none;
}
</style>