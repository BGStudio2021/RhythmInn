<script setup lang="ts">
import logo from '/favicon.ico'
import title from '../assets/RhythmInn-Title.png'

const hidden = defineModel()
</script>
<template>
    <Teleport to="body">
        <div class="splash" :class="{ 'splash-hidden': hidden }">
            <img :src="logo" alt="RhythmInn-Logo" class="logo">
            <img :src="title" alt="RhythmInn-Title" class="title">
            <div class="loading-bar"></div>
            <div class="mark">Made by Burger Studio.</div>
        </div>
    </Teleport>
</template>
<style scoped>
.splash {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: var(--indigo-background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    transition: 0.3s var(--easeOutCirc);
}

.splash-hidden {
    opacity: 0;
    pointer-events: none;
}

.logo {
    width: 128px;
    height: 128px;
}

.title {
    width: 200px;
    margin: 16px 0 32px 0;
    filter: invert(1);
    opacity: 0.8;
}

.loading-bar {
    position: relative;
    width: 256px;
    height: 8px;
    background: rgba(0, 0, 0, 0.25);
}

.loading-bar::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 64px;
    height: 8px;
    background: var(--indigo-text);
    animation: slide 1s alternate-reverse infinite linear;
}

@keyframes slide {
    from {
        left: calc(256px - 64px);
    }

    to {
        left: 0;
    }
}

.mark {
    position: absolute;
    text-align: center;
    bottom: 16px;
    opacity: 0.8;
}

/* 深色主题 */

.body-theme-dark .title {
    filter: none;
}

.body-theme-dark .loading-bar {
    background: rgba(255, 255, 255, 0.25);
}

@media(prefers-color-scheme: dark) {
    .body-theme-system .title {
        filter: none;
    }

    .body-theme-system .loading-bar {
        background: rgba(255, 255, 255, 0.25);
    }
}
</style>