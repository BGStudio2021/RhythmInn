<script setup lang="ts">
import { inject } from 'vue'
import clearIcon from '../assets/icons/clear.svg'
import type { Track, Queue } from './types.ts'

const props = defineProps<{
    info: Track
}>()
const queue = defineModel<Queue>('queue')
const nextTrack = inject<() => void>('nextTrack')

// 删除曲目
function removeFromQueue() {
    if (props.info.id === queue.value?.current?.id) {
        if (queue.value.queue.length != 1) {
            if (nextTrack) nextTrack()
        } else {
            queue.value.current = undefined
        }
    }
    queue.value?.queue.splice(queue.value?.queue.indexOf(props.info), 1)
}

// 播放曲目
function play() {
    queue.value!.current = props.info
}
</script>
<template>
    <div class="play-queue-item" :class="{ 'play-queue-item-active': info.id === queue?.current?.id }" @click="play()">
        <div style="flex-grow: 1;padding-right: 4px;">
            <div class="play-queue-item-name">{{ info.name }}</div>
            <div class="play-queue-item-artists">{{info.artists.map(({ name }) => name).join(' & ')}}</div>
        </div>
        <div class="play-queue-item-btn" @click.stop="removeFromQueue()">
            <img :src="clearIcon">
        </div>
    </div>
</template>
<style scoped>
.play-queue-item {
    color: #fff;
    padding: 8px 8px 8px 16px;
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break: break-all;
}

.play-queue-item:not(:has(.play-queue-item-btn:hover)):hover {
    background: var(--hover-light);
}

.play-queue-item:not(:has(.play-queue-item-btn:active)):active {
    background: var(--active-light);
}

.play-queue-item-active {
    background: var(--hover-light);
}

.play-queue-item-name {
    font-size: 16px;
}

.play-queue-item-artists {
    font-size: 14px;
    opacity: 0.8;
}

.play-queue-item-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 36px;
    height: 36px;
}

.play-queue-item-btn:hover {
    background: var(--hover-light);
}

.play-queue-item-btn:active {
    background: var(--active-light);
}

.play-queue-item-btn img {
    filter: invert(1);
}
</style>