<script setup lang="ts">
import { useTouchOptimize } from './touchOptimize.ts'
const { pressed: touchPressed, press: touchPress, lift: touchLift } = useTouchOptimize()

const props = defineProps<{
    href: string
}>()
</script>
<template>
    <a :href class="link" :class="{ 'link-active': touchPressed === 1 }" @touchstart="touchPress(1)"
        @touchend="touchLift()">
        <slot></slot>
    </a>
</template>
<style scoped>
.link {
    color: var(--indigo-text);
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}

.link:hover {
    filter: grayscale(1);
}

.link:active,
.link-active {
    filter: grayscale(1);
    opacity: 0.5;
}
</style>