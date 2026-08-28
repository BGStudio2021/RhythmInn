<script setup lang="ts">
import { ref } from 'vue'
import clearIcon from '../assets/icons/clear.svg'

const props = withDefaults(
    defineProps<{
        type?: string,
        icon?: string,
        placeholder?: string
    }>(),
    {
        type: 'text'
    }
)

const text = defineModel() // 输入内容绑定
const input = ref()

// 聚焦
function focus() {
    input.value.focus()
}
defineExpose({ focus })

// 清空
function clearInput() {
    text.value = ''
    focus()
}
</script>
<template>
    <div class="input-container">
        <input :type="type" class="input" :class="{ 'input-with-icon': icon }" :placeholder="placeholder" ref="input"
            v-model="text">
        <div class="input-icon" v-if="icon">
            <img :src="icon">
        </div>
        <div class="input-clear-btn" @click="clearInput()">
            <img :src="clearIcon">
        </div>
    </div>
</template>
<style scoped>
.input-container {
    position: relative;
}

.input {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(0, 0, 0, 0.2);
    outline: none;
    padding: 6px 8px;
    width: 100%;
    box-sizing: border-box;
    font-size: 15px;
    font-family: "Segoe UI Variable", "Segoe UI", "Microsoft YaHei UI", "微软雅黑", sans-serif;
    transition: padding 0.3s var(--easeOutCirc);
}

.input:hover {
    border: 2px solid var(--border-dark-dynamic) !important;
}

.input:focus,
.input:has(~.input-clear-btn:active) {
    background: rgba(255, 255, 255, 0.4);
    border: 2px solid var(--indigo-primary) !important;
}

.input-with-icon {
    padding: 6px 8px 6px 32px;
}

.input-with-icon:focus {
    padding: 6px 36px 6px 44px;
}

.input-with-icon:has(~.input-clear-btn:hover),
.input-with-icon:has(~.input-clear-btn:active) {
    padding: 6px 44px;
}

.input-icon {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 2px;
    top: 2px;
    width: 36px;
    height: calc(100% - 4px);
    transition: 0.3s var(--easeOutCirc);
}

.input:focus~.input-icon,
.input:has(~.input-clear-btn:active)~.input-icon {
    background: var(--indigo-primary);
}

.input:focus~.input-icon img,
.input:has(~.input-clear-btn:active)~.input-icon img {
    filter: invert(1);
    opacity: 1;
}

.input-icon img {
    width: 20px;
    height: 20px;
    opacity: 0.5;
    transition: filter 0.3s var(--easeOutCirc),
        opacity 0.3s var(--easeOutCirc);
}

.input-clear-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 2px;
    top: 2px;
    width: 36px;
    height: calc(100% - 4px);
    transition: opacity 0.3s var(--easeOutCirc);
    opacity: 0;
    pointer-events: none;
}

.input:focus~.input-clear-btn,
.input-clear-btn:active {
    opacity: 1;
    pointer-events: all;
}

.input-clear-btn:hover {
    background: var(--hover-dark-dynamic);
}

.input-clear-btn:active {
    background: var(--active-dark-dynamic);
}

.input-clear-btn img {
    width: 20px;
    height: 20px;
    opacity: 0.5;
}

/* 深色主题 */

.body-theme-dark .input {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: #fff;
}

.body-theme-dark .input:focus,
.body-theme-dark .input:has(~.input-clear-btn:active) {
    background: transparent;
}

.body-theme-dark .input-icon img,
.body-theme-dark .input-clear-btn img {
    filter: invert(1);
}

@media(prefers-color-scheme: dark) {
    .body-theme-system .input {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.2);
        color: #fff;
    }

    .body-theme-system .input:focus,
    .body-theme-system .input:has(~.input-clear-btn:active) {
        background: transparent;
    }

    .body-theme-system .input-icon img,
    .body-theme-system .input-clear-btn img {
        filter: invert(1);
    }
}
</style>