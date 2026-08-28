<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon?: string,
        active?: boolean
    }>(),
    {
        active: false
    }
)
</script>
<template>
    <div class="sidebar-item" :class="{ 'sidebar-item-active': active }">
        <div class="sidebar-item-icon" v-if="icon">
            <img :src="icon">
        </div>
        <div class="sidebar-item-text">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.sidebar-item {
    display: flex;
    margin: 0 8px;
    padding: 10px 8px;
    color: #fff;
    font-size: 16px;
}

.sidebar-item:hover,
.sidebar-item-active {
    background: var(--hover-light);
}

.sidebar-item:active {
    background: var(--active-light);
}

.sidebar-item-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 36px;
}

.sidebar-item-icon img {
    filter: invert(1);
}

.sidebar-item-text {
    flex-grow: 1;
    padding: 0 8px 0 4px;
    overflow-x: auto;
}

.sidebar-item-text::-webkit-scrollbar {
    background: transparent;
    height: 4px;
}

.sidebar-item-text::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
}

.sidebar-item-text::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.35);
}

.sidebar-item-text::-webkit-scrollbar-thumb:active {
    background: rgba(255, 255, 255, 0.45);
}
</style>