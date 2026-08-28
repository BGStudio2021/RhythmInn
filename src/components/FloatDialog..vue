<script setup lang="ts">
const open = defineModel('open', { default: false })
</script>
<template>
    <div class="float-dialog" :class="{ 'float-dialog-open': open }">
        <div class="float-dialog-title">
            <slot name="title"></slot>
        </div>
        <div class="float-dialog-content">
            <slot name="content"></slot>
        </div>
        <div class="float-dialog-actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>
<style scoped>
.float-dialog {
    position: absolute;
    z-index: 103;
    border: 2px solid var(--indigo-text);
    outline: 2px solid var(--indigo-background);
    background: var(--indigo-background);
    padding: 8px 16px;
    transition: 0.3s var(--easeOutCirc);
    opacity: 0;
    transform: translateY(-16px);
    pointer-events: none;
}

.float-dialog-open {
    opacity: 1;
    transform: none;
    pointer-events: all;
}

.float-dialog-title {
    font-size: 16px;
}

.float-dialog-content {
    font-size: 14px;
    margin: 4px 0 12px 0;
}

.float-dialog-actions {
    display: flex;
    gap: 4px;
}

.float-dialog-actions * {
    flex-grow: 1;
}
</style>