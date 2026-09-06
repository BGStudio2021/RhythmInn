<script setup lang="ts">
import playlistAddIcon from '../assets/icons/playlist_add.svg'
import infoIcon from '../assets/icons/info.svg'
import { inject, ref } from 'vue'
import SecondaryButton from './SecondaryButton.vue'
import type { Track, Queue } from './types.ts'
import { processDuration } from './processDuration.ts'
import { useTouchOptimize } from './touchOptimize.ts'
const { pressed: touchPressed, press: touchPress, lift: touchLift } = useTouchOptimize()

const props = defineProps<{
    number: number
    info: Track
}>()
const unfolded = ref(false)
const queue = defineModel<Queue>('queue')
const addToQueue = inject<(track: Track, options?: {}) => void>('addToQueue')

// 打开单曲页面
function openTrackPage(id: number) {
    window.open(`https://music.163.com/song?id=${id}`, '_blank')
}
</script>
<template>
    <div class="track" @click="addToQueue ? addToQueue(info, { toast: false, playNow: true }) : undefined"
        :class="{ 'track-active': queue?.current?.id === info.id, 'track-touch-active': touchPressed === 1 }"
        @touchstart="touchPress(1)" @touchend="touchLift()">
        <div class="track-content-regular">
            <div class="track-number">{{ number }}</div>
            <img class="track-cover" :src="info.album.cover">
            <div class="track-info">
                <div class="track-name">{{ info.name }}</div>
                <div class="track-artist">{{info.artists.map(({ name }) => name).join(' & ')}}</div>
            </div>
            <div class="track-btn" :class="{ 'track-btn-active': touchPressed === 2 }"
                @click.stop="addToQueue ? addToQueue(info) : undefined" @touchstart.stop="touchPress(2)"
                @touchend.stop="touchLift()">
                <img :src="playlistAddIcon">
            </div>
            <div class="track-btn" :class="{ 'track-btn-active': touchPressed === 3 }"
                @click.stop="unfolded = !unfolded" @touchstart.stop="touchPress(3)" @touchend.stop="touchLift()">
                <img :src="infoIcon">
            </div>
        </div>
        <div class="track-content-detailed" :class="{ 'track-content-detailed-unfolded': unfolded }" @click.stop>
            <div style="overflow: hidden;">
                专辑：{{ info.album.name }}<br>
                时长：{{ processDuration(info.duration) }}
                <div>
                    <SecondaryButton @click="openTrackPage(info.id)" style="float: right;" @touchstart.stop
                        @touchend.stop>打开单曲页面</SecondaryButton>
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
    width: calc(100% - 32px);
}

.track-content-regular {
    display: flex;
    align-items: center;
    width: 100%;
}

.track:not(:has(.track-btn:hover)):hover {
    background: var(--hover-dark-dynamic);
}

.track:not(:has(.track-btn:active)):not(:has(.secondary-button:active)):active,
.track-touch-active {
    background: var(--active-dark-dynamic) !important;
}

.track-active {
    background: var(--indigo-100);
}

.track-active:not(:has(.track-btn:hover)):hover {
    background: var(--indigo-100);
}

.track-active:not(:has(.track-btn:active)):not(:has(.secondary-button:active)):active,
.track-active.track-touch-active {
    background: var(--indigo-200) !important;
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

.track-btn:active,
.track-btn-active {
    background: var(--active-dark-dynamic) !important;
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

@media screen and (max-width:720px) {
    .track {
        margin: 0 12px;
        width: calc(100% - 24px);
    }

    .track-number {
        font-size: 15px;
    }

    .track-name {
        font-size: 15px;
    }

    .track-artist {
        font-size: 13px;
    }

    .track-content-detailed {
        font-size: 15px;
    }
}

/* 深色主题 */

.body-theme-dark .track-active {
    background: rgba(63, 81, 181, 0.5);
}

.body-theme-dark .track-active:not(:has(.track-btn:hover)):hover {
    background: rgba(63, 81, 181, 0.5);
}

.body-theme-dark .track-active:not(:has(.track-btn:active)):not(:has(.secondary-button:active)):active,
.body-theme-dark .track-active.track-touch-active {
    background: rgba(92, 107, 192, 0.5) !important;
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

    .body-theme-system .track-active:not(:has(.track-btn:active)):not(:has(.secondary-button:active)):active,
    .body-theme-system .track-active.track-touch-active {
        background: rgba(92, 107, 192, 0.5) !important;
    }

    .body-theme-system .track-btn img {
        filter: invert(1);
    }
}
</style>