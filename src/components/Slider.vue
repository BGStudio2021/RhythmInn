<script setup lang="ts">const value = defineModel()
const emit = defineEmits(['input'])

function handleInput(e: InputEvent) {
    emit('input', e)
}
</script>
<template>
    <input type="range" class="slider" :value @input="handleInput">
</template>
<style scoped>
.slider {
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    background-color: transparent;
}

.slider::-webkit-slider-runnable-track {
    height: 4px;
    background: rgba(0, 0, 0, 0.2);
}

.slider::-webkit-slider-container {
    height: 20px;
    overflow: hidden;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 6px;
    height: 20px;
    background: var(--indigo-500);
    border: 1px solid transparent;
    margin-top: -8px;
    border-image: linear-gradient(var(--indigo-300), var(--indigo-300)) 0 fill / 11 9 11 0 / 0 0 0 2000px;
}

.slider:hover::-webkit-slider-thumb {
    background: var(--indigo-300);
}

.slider:active::-webkit-slider-thumb {
    background: #000;
}

/* 深色主题 */
.body-theme-dark .slider::-webkit-slider-runnable-track {
    background: rgba(255, 255, 255, 0.2);
}

.body-theme-dark .slider::-webkit-slider-thumb {
    background: var(--indigo-300);
    border-image: linear-gradient(var(--indigo-400), var(--indigo-400)) 0 fill / 11 9 11 0 / 0 0 0 2000px;
}

.body-theme-dark .slider:hover::-webkit-slider-thumb {
    background: var(--indigo-200);
}

.body-theme-dark .slider:active::-webkit-slider-thumb {
    background: #fff;
}

@media(prefers-color-scheme: dark) {
    .body-theme-system .slider::-webkit-slider-runnable-track {
        background: rgba(255, 255, 255, 0.2);
    }

    .body-theme-system .slider::-webkit-slider-thumb {
        background: var(--indigo-300);
        border-image: linear-gradient(var(--indigo-400), var(--indigo-400)) 0 fill / 11 9 11 0 / 0 0 0 2000px;
    }

    .body-theme-system .slider:hover::-webkit-slider-thumb {
        background: var(--indigo-200);
    }

    .body-theme-system .slider:active::-webkit-slider-thumb {
        background: #fff;
    }
}
</style>