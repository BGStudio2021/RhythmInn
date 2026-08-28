<script setup lang="ts">
import { ref } from 'vue'

const hidden = ref(true) // 显示状态
const toastMsg = ref('')
let timeout
// 展示 Toast
function show(msg: string) {
    // 打断已有计时器
    if (timeout!) {
        hidden.value = true
        clearTimeout(timeout)
        timeout = undefined
        setTimeout(() => {
            show(msg)
        }, 300)
        return
    }
    toastMsg.value = msg
    hidden.value = false
    timeout = setTimeout(() => {
        hidden.value = true
        timeout = undefined
    }, 5000)
}
// 暴露方法
defineExpose({ show })
</script>
<template>
    <div class="toast" :class="{ 'toast-visible': !hidden }">{{ toastMsg }}</div>
</template>
<style scoped>
.toast {
    position: fixed;
    z-index: 101;
    right: 16px;
    top: 16px;
    background: var(--indigo-primary);
    color: #fff;
    padding: 12px 24px;
    font-size: 16px;
    border: 2px solid var(--indigo-background);
    transition: 0.3s var(--easeOutCirc);
    opacity: 0;
    pointer-events: none;
    transform: translateX(16px);
}

.toast-visible {
    opacity: 1;
    transform: none;
    pointer-events: all;
}

/* 深色主题 */
.body-theme-dark .toast {
    border: 2px solid var(--indigo-200);
}

@media(prefers-color-scheme: dark) {
    .body-theme-system .toast {
        border: 2px solid var(--indigo-200);
    }
}
</style>