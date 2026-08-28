<script setup lang="ts">
const props = defineProps<{
    icon: string
}>()
</script>
<template>
    <button class="transparent-icon-button">
        <img :src="icon">
    </button>
</template>
<style scoped>
.transparent-icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    background: transparent;
    padding: 6px;
}

.transparent-icon-button:hover {
    outline: 2px solid var(--border-dark-dynamic);
    transition: background 1s var(--easeOutCirc);
}

.transparent-icon-button:active {
    background: var(--border-dark-dynamic);
    color: #fff;
    transition: 0s;
}

.transparent-icon-button img {
    width: 28px;
    height: 28px;
    opacity: 0.8;
    transition: 1s var(--easeOutCirc);
}

.transparent-icon-button:active img {
    filter: invert(1);
    transition: 0s;
}

.transparent-icon-button:disabled {
    opacity: 0.6;
    pointer-events: none;
}

/* 深色主题 */

.body-theme-dark .transparent-icon-button img {
    filter: invert(1);
}

.body-theme-dark .transparent-icon-button:active img {
    filter: none;
}

@media(prefers-color-scheme: dark) {
    .body-theme-system .transparent-icon-button img {
        filter: invert(1);
    }

    .body-theme-system .transparent-icon-button:active img {
        filter: none;
    }
}
</style>