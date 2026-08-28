<script setup lang="ts">
import arrowBackIcon from '../assets/icons/arrow_back.svg'
import PlayQueueItem from './PlayQueueItem.vue'
import type { Queue, Track } from './types.ts'
import deleteSweepIcon from '../assets/icons/delete_sweep.svg'
import QueueTransition from './QueueTransition.vue'
import { inject, nextTick, onMounted, ref, watch } from 'vue'
import FloatDialog from './FloatDialog..vue'
import PrimaryButton from './PrimaryButton.vue'
import SecondaryButton from './SecondaryButton.vue'
import UniversalOverlay from './UniversalOverlay.vue'

const hidden = defineModel<boolean>('hidden', { default: true })
const queue = defineModel<Queue>('queue')
const registerMethod = inject<(name: string, fn: Function) => void>('registerMethod')
const floatDialogOpen_clearQueue = ref(false)

// 定位到指定曲目
async function scrollToQueueTrack(track: Track) {
    await nextTick()
    const target = document.querySelector(`[queue-track-id='${track.id}']`)
    if (target && !hidden.value) { // 只有播放队列打开的时候才滚动！否则会横向滚动溢出屏幕！
        target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}

// 切换曲目时自动定位
watch(() => queue.value?.current, (newTrack) => {
    if (newTrack) {
        scrollToQueueTrack(newTrack)
    }
})

// 打开播放队列时自动定位
watch(hidden, () => {
    if (!hidden.value) {
        setTimeout(() => {
            if (queue.value?.current) {
                scrollToQueueTrack(queue.value?.current)
            }
        }, 500);
    }
})

// 清空播放列表
function clearQueue() {
    queue.value!.queue = []
    queue.value!.current = undefined
    floatDialogOpen_clearQueue.value = false
}

onMounted(() => {
    if (registerMethod) { registerMethod('scrollToQueueTrack', scrollToQueueTrack) }
})
</script>
<template>
    <FloatDialog style="top: 64px;right: 16px;min-width: 200px;" v-model:open="floatDialogOpen_clearQueue">
        <template #title>清空播放队列</template>
        <template #content>要清空当前播放队列吗？</template>
        <template #actions>
            <SecondaryButton @click="floatDialogOpen_clearQueue = false">取消</SecondaryButton>
            <PrimaryButton @click="clearQueue()">清空</PrimaryButton>
        </template>
    </FloatDialog>
    <UniversalOverlay :open="floatDialogOpen_clearQueue" @click="floatDialogOpen_clearQueue = false" />
    <div class="play-queue-container" :class="{ 'play-queue-container-visible': !hidden }">
        <div class="play-queue">
            <div class="play-queue-header">
                <div class="play-queue-header-btn" @click="hidden = !hidden">
                    <img :src="arrowBackIcon">
                </div>
                <div class="play-queue-header-title">播放队列（{{ queue?.queue.length }}）</div>
                <div class="play-queue-header-btn" @click="floatDialogOpen_clearQueue = true">
                    <img :src="deleteSweepIcon">
                </div>
            </div>
            <div class="play-queue-list">
                <Transition name="emptyText">
                    <div class="play-queue-list-empty" v-if="queue?.queue.length === 0">QAQ 没有内容</div>
                </Transition>
                <QueueTransition>
                    <PlayQueueItem v-for="track in queue!.queue" :info="track" :key="track.id" v-model:queue="queue"
                        :queue-track-id="track.id" />
                </QueueTransition>
            </div>
        </div>
    </div>
</template>
<style scoped>
.play-queue-container {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--indigo-primary-dynamic);
    transform: translateX(100%);
    transition: 0.5s var(--easeOutCirc);
}

.play-queue-container-visible {
    transform: none;
}

.play-queue {
    height: 100%;
    transform: translateX(50%);
    transition: 0.6s 0.5s var(--easeOutCirc);
}

.play-queue-container-visible .play-queue {
    transform: none;
    transition: 0.6s var(--easeOutCirc);
}

.play-queue-header {
    display: flex;
    height: 48px;
}

.play-queue-header-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
}

.play-queue-header-btn img {
    filter: invert(1);
}

.play-queue-header-btn:hover {
    background: var(--hover-light);
}

.play-queue-header-btn:active {
    background: var(--active-light);
}

.play-queue-header-title {
    display: flex;
    align-items: center;
    flex-grow: 1;
    color: #fff;
    font-size: 16px;
    padding: 0 16px;
}

.play-queue-list {
    position: relative;
    height: calc(100% - 64px);
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
}

.play-queue-list::-webkit-scrollbar {
    background: transparent;
    width: 8px;
}

.play-queue-list::-webkit-scrollbar-thumb {
    background: var(--scrollbar-light);
}

.play-queue-list::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-light-hover);
}

.play-queue-list::-webkit-scrollbar-thumb:active {
    background: var(--scrollbar-light-active);
}

.play-queue-list-empty {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    opacity: 0.8;
    color: #fff;
}

/* “没有内容”文本提示动画 */
.emptyText-enter-active,
.emptyText-leave-active {
    transition: 0.2s var(--easeOutCirc);
}

.emptyText-enter-from,
.emptyText-leave-to {
    opacity: 0;
}
</style>