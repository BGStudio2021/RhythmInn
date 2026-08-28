<script setup lang="ts">
import playlistAddIcon from '../assets/icons/playlist_add.svg'
import infoIcon from '../assets/icons/info.svg'
import { inject, ref } from 'vue'
import SecondaryButton from './SecondaryButton.vue'
import type { Track, Queue } from './types.ts'
import { processDuration } from './processDuration.ts'

const props = defineProps<{
    number: number
    info: Track
}>()
const unfolded = ref(false)
const queue = defineModel<Queue>('queue')
const addToQueue = inject<(track: Track, options?: {}) => void>('addToQueue')

// 打开单曲页面
function openTrackPage(id: number) {
    location.href = `https://music.163.com/song?id=${id}`
}
</script>
<template>
    <div class="track" @click="addToQueue ? addToQueue(info, { toast: false, playNow: true }) : undefined"
        :class="{ 'track-active': queue?.current?.id === info.id }">
        <div class="track-content-regular">
            <div class="track-number">{{ number }}</div>
            <img class="track-cover" :src="info.album.cover">
            <div class="track-info">
                <div class="track-name">{{ info.name }}</div>
                <div class="track-artist">{{info.artists.map(({ name }) => name).join(' & ')}}</div>
            </div>
            <div class="track-btn" @click.stop="addToQueue ? addToQueue(info) : undefined">
                <img :src="playlistAddIcon">
            </div>
            <div class="track-btn" @click.stop="unfolded = !unfolded">
                <img :src="infoIcon">
            </div>
        </div>
        <div class="track-content-detailed" :class="{ 'track-content-detailed-unfolded': unfolded }" @click.stop>
            <div style="overflow: hidden;">
                专辑：{{ info.album.name }}<br>
                时长：{{ processDuration(info.duration) }}
                <div>
                    <SecondaryButton @click="openTrackPage(info.id)" style="float: right;">打开单曲页面</SecondaryButton>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.track {
    display: flex;
    flex-direction: column;
    margin: 0 16px;
    padding: 8px 8px 8px 0;
    width: calc(100% - 40px);
}

.track-content-regular {
    display: flex;
    align-items: center;
    width: 100%;
}

.track:not(:has(.track-btn:hover)):hover {
    background: var(--hover-dark-dynamic);
}

.track:not(:has(.track-btn:active)):not(:has(.secondary-button:active)):active {
    background: var(--active-dark-dynamic);
}

.track-active {
    background: var(--indigo-100);
}

.track-active:not(:has(.track-btn:hover)):hover {
    background: var(--indigo-100);
}

.track-active:not(:has(.track-btn:active)):not(:has(.secondary-button:active)):active {
    background: var(--indigo-200);
}

.track-number {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 48px;
}

.track-cover {
    width: 36px;
    height: 36px;
}

.track-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    margin-left: 8px;
}

.track-name {
    font-size: 16px;
    word-break: break-all;
    word-wrap: break-word;
}

.track-artist {
    font-size: 14px;
    opacity: 0.8;
    word-break: break-all;
    word-wrap: break-word;
}

.track-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 36px;
    height: 36px;
}

.track-btn:hover {
    background: var(--hover-dark-dynamic);
}

.track-btn:active {
    background: var(--active-dark-dynamic);
}

.track-btn img {
    opacity: 0.8;
}

.track-details {
    padding: 16px;
}

.track-content-detailed {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    padding: 0 48px;
    transform: scale(0.85);
    transition: 0.5s var(--easeOutCirc);
}

.track-content-detailed-unfolded {
    grid-template-rows: 1fr;
    opacity: 1;
    padding: 8px 0 0 48px;
    transform: scale(1);
}

/* 深色主题 */

.body-theme-dark .track-active {
    background: rgba(63, 81, 181, 0.5);
}

.body-theme-dark .track-active:not(:has(.track-btn:hover)):hover {
    background: rgba(63, 81, 181, 0.5);
}

.body-theme-dark .track-active:not(:has(.track-btn:active)):not(:has(.secondary-button:active)):active {
    background: rgba(92, 107, 192, 0.5);
}

.body-theme-dark .track-btn img {
    filter: invert(1);
}

@media(prefers-color-scheme: dark) {
    .body-theme-system .track-active {
        background: rgba(63, 81, 181, 0.5);
    }

    .body-theme-system .track-active:not(:has(.track-btn:hover)):hover {
        background: rgba(63, 81, 181, 0.5);
    }

    .body-theme-system .track-active:not(:has(.track-btn:active)):not(:has(.secondary-button:active)):active {
        background: rgba(92, 107, 192, 0.5);
    }

    .body-theme-system .track-btn img {
        filter: invert(1);
    }
}
</style>