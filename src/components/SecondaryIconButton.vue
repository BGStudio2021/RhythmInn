<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon?: string,
        iconSize?: string
    }>(),
    {
        iconSize: 'normal'
    }
)
</script>
<template>
    <button class="secondary-icon-button" :class="{ 'secondary-icon-button-small': iconSize === 'small' }">
        <img :src="icon" v-if="icon">
        <slot></slot>
    </button>
</template>
<style scoped>
.secondary-icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    background: rgba(0, 0, 0, 0.1);
    padding: 6px;
}

.secondary-icon-button:hover {
    outline: 2px solid var(--border-dark-dynamic);
    transition: background 1s var(--easeOutCirc),
        color 1s var(--easeOutCirc);
}

.secondary-icon-button:active {
    background: var(--border-dark-dynamic) !important;
    color: #fff;
    transition: 0s;
}

.secondary-icon-button-small {
    padding: 8px;
}

.secondary-icon-button img {
    width: 28px;
    height: 28px;
    opacity: 0.8;
    transition: 1s var(--easeOutCirc);
}

.secondary-icon-button-small img {
    width: 24px;
    height: 24px;
}

.secondary-icon-button:active img {
    filter: invert(1);
    transition: 0s;
}

.secondary-icon-button:disabled {
    opacity: 0.6;
    pointer-events: none;
}

/* 深色主题 */

.body-theme-dark .secondary-icon-button {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
}

.body-theme-dark .secondary-icon-button:active {
    color: #000;
}

.body-theme-dark .secondary-icon-button img {
    filter: invert(1);
}

.body-theme-dark .secondary-icon-button:active img {
    filter: none;
}

@media(prefers-color-scheme: dark) {
    .body-theme-system .secondary-icon-button {
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
    }

    .body-theme-system .secondary-icon-button:active {
        color: #000;
    }

    .body-theme-system .secondary-icon-button img {
        filter: invert(1);
    }

    .body-theme-system .secondary-icon-button:active img {
        filter: none;
    }
}
</style>