<script setup lang="ts">
import { useTouchOptimize } from './touchOptimize.ts'
const { pressed: touchPressed, press: touchPress, lift: touchLift } = useTouchOptimize()

const props = defineProps<{
    icon: string
}>()
</script>
<template>
    <button class="transparent-icon-button" :class="{ 'transparent-icon-button-active': touchPressed === 1 }"
        @touchstart="touchPress(1)" @touchend="touchLift()">
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

.transparent-icon-button:active,
.transparent-icon-button-active {
    outline: 2px solid var(--border-dark-dynamic);
    background: var(--border-dark-dynamic);
    color: #fff;
    transition: 0s !important;
}

.transparent-icon-button img {
    width: 28px;
    height: 28px;
    opacity: 0.8;
}

.transparent-icon-button:hover img {
    transition: 1s var(--easeOutCirc);
}

.transparent-icon-button:active img,
.transparent-icon-button-active img {
    filter: invert(1);
    transition: 0s !important;
}

.transparent-icon-button:disabled {
    opacity: 0.6;
    pointer-events: none;
}

/* 深色主题 */

.body-theme-dark .transparent-icon-button img {
    filter: invert(1);
}

.body-theme-dark .transparent-icon-button:active img,
.body-theme-dark .transparent-icon-button-active img {
    filter: none;
}

@media(prefers-color-scheme: dark) {
    .body-theme-system .transparent-icon-button img {
        filter: invert(1);
    }

    .body-theme-system .transparent-icon-button:active img,
    .body-theme-system .transparent-icon-button-active img {
        filter: none;
    }
}
</style>