<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        open?: boolean
    }>(),
    {
        open: false
    }
)
</script>
<template>
    <div class="universal-overlay" :class="{ 'universal-overlay-open': open }"></div>
</template>
<style scoped>
.universal-overlay {
    position: absolute;
    z-index: 102;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.universal-overlay-open {
    pointer-events: all;
}
</style>