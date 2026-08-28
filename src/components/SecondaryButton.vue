<script setup lang="ts">
const props = defineProps<{
    icon?: string
}>()
</script>
<template>
    <button class="secondary-button" :class="{ 'secondary-button-with-icon': icon }">
        <img :src="icon" v-if="icon" class="secondary-button-icon">
        <slot></slot>
    </button>
</template>
<style scoped>
.secondary-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    outline: none;
    padding: 6px 18px;
    margin: 2px;
    background: rgba(0, 0, 0, 0.1);
    font-size: 14px;
    font-family: "Segoe UI Variable", "Segoe UI", "Microsoft YaHei UI", "微软雅黑", sans-serif;
}

.secondary-button:hover {
    outline: 2px solid var(--border-dark-dynamic);
    transition-property: background, color;
    transition-duration: 1s;
    transition-timing-function: var(--easeOutCirc);
}

.secondary-button:active {
    background: var(--border-dark-dynamic) !important;
    color: #fff;
    transition: 0s;
}

.secondary-button-with-icon {
    padding: 6px 16px;
}

.secondary-button-icon {
    width: 24px;
    height: 24px;
    opacity: 0.8;
    transition: 1s var(--easeOutCirc);
}

.secondary-button:active .secondary-button-icon {
    filter: invert(1);
    transition: 0s;
}

.secondary-button:disabled {
    opacity: 0.6;
    pointer-events: none;
}

/* 深色主题 */

.body-theme-dark .secondary-button {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
}

.body-theme-dark .secondary-button:active {
    color: #000;
}

@media(prefers-color-scheme: dark) {
    .body-theme-system .secondary-button {
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
    }

    .body-theme-system .secondary-button:active {
        color: #000;
    }
}
</style>