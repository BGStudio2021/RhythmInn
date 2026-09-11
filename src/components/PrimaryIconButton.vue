<script setup lang="ts">
import { useTouchOptimize } from './touchOptimize.ts'
const { pressed: touchPressed, press: touchPress, lift: touchLift } = useTouchOptimize()

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
    <button class="primary-icon-button"
        :class="{ 'primary-icon-button-small': iconSize === 'small', 'primary-icon-button-active': touchPressed === 1 }"
        @touchstart="touchPress(1)" @touchend="touchLift()">
        <img :src="icon" v-if="icon">
        <slot></slot>
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
    color: #fff;
    padding: 6px;
}

.primary-icon-button:hover {
    outline: 2px solid var(--border-dark-dynamic);
    transition: background 1s var(--easeOutCirc),
        color 1s var(--easeOutCirc);
}

.primary-icon-button:active,
.primary-icon-button-active {
    outline: 2px solid var(--border-dark-dynamic);
    background: rgba(255, 255, 255, 0.6) !important;
    color: #000;
    transition: 0s !important;
}

.primary-icon-button-small {
    padding: 8px;
}

.primary-icon-button img {
    width: 28px;
    height: 28px;
    opacity: 0.8;
    filter: invert(1);
}

.primary-icon-button-small img {
    width: 24px;
    height: 24px;
}

.primary-icon-button:hover img {
    transition: 1s var(--easeOutCirc);
}

.primary-icon-button:active img,
.primary-icon-button-active img {
    filter: none;
    transition: 0s !important;
}

.primary-icon-button:disabled {
    opacity: 0.6;
    pointer-events: none;
}
</style>