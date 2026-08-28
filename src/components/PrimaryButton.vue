<script setup lang="ts">
const props = defineProps<{
    icon?: string
}>()
</script>
<template>
    <button class="primary-button" :class="{ 'primary-button-with-icon': icon }">
        <img :src="icon" v-if="icon" class="primary-button-icon">
        <slot></slot>
    </button>
</template>
<style scoped>
.primary-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    outline: none;
    padding: 6px 18px;
    margin: 2px;
    background: var(--indigo-primary);
    color: #fff;
    font-size: 14px;
    font-family: "Segoe UI Variable", "Segoe UI", "Microsoft YaHei UI", "微软雅黑", sans-serif;
}

.primary-button:hover {
    outline: 2px solid var(--border-dark-dynamic);
    transition-property: background, color;
    transition-duration: 1s;
    transition-timing-function: var(--easeOutCirc);
}

.primary-button:active {
    background: rgba(255, 255, 255, 0.6);
    color: #000;
    transition: 0s;
}

.primary-button-with-icon {
    padding: 6px 16px;
}

.primary-button-icon {
    width: 24px;
    height: 24px;
    opacity: 0.8;
    filter: invert(1);
    transition: 1s var(--easeOutCirc);
}

.primary-button:active .primary-button-icon {
    transition: 0s;
    filter: none;
}

.primary-button:disabled {
    opacity: 0.6;
    pointer-events: none;
}
</style>