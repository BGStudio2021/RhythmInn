<script setup lang="ts">
const props = defineProps<{
    href: string
}>()
</script>
<template>
    <a :href class="link">
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

.link:active {
    opacity: 0.5;
}
</style>