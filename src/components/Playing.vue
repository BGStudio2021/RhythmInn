<script setup lang="ts">
import PrimaryIconButton from './PrimaryIconButton.vue'
import repeatIcon from '../assets/icons/repeat.svg'
import repeatOneIcon from '../assets/icons/repeat_one.svg'
import shuffleIcon from '../assets/icons//shuffle.svg'
import queueMusicIcon from '../assets/icons/queue_music.svg'
import skipPreviousIcon from '../assets/icons/skip_previous.svg'
import skipNextIcon from '../assets/icons/skip_next.svg'
import pauseIcon from '../assets/icons/pause.svg'
import playArrowIcon from '../assets/icons/play_arrow.svg'
import TransparentIconButton from './TransparentIconButton.vue'
import Slider from './Slider.vue'
import { inject, onMounted, provide, ref, watch } from 'vue'
import PlayQueue from './PlayQueue.vue'
import favicon from '/favicon.ico'
import type { Queue, Track } from './types.ts'
import CoverTransition from './CoverTransition.vue'
import NameTransition from './NameTransition.vue'
import { processDuration } from '../components/processDuration.ts'
import volumeUpIcon from '../assets/icons/volume_up.svg'
import BackgroundTransition from './BackgroundTransition.vue'
import { settings } from './settings.ts'

const showToast = inject<(msg: string) => void>('showToast')
const hideQueue = ref(true)
const queue = defineModel<Queue>('queue')
const audioRef = ref()
const playStatus = ref({ paused: true, duration: 0, currentTime: 0 })
const timeStr = ref({ current: '00:00', full: '00:00' })
const volume = ref(1)

// 播放模式（顺序）
const playModeList = [
    { mode: 'LoopAll', icon: repeatIcon, name: '队列循环' },
    { mode: 'LoopOne', icon: repeatOneIcon, name: '单曲循环' },
    { mode: 'Random', icon: shuffleIcon, name: '随机播放' }
]
const playMode = ref(0)
function switchPlayMode() {
    playMode.value = (playMode.value + 1) % 3
    if (showToast) { showToast(playModeList[playMode.value]!.name) }
}

// 播放 / 暂停
async function playPause() {
    const audio = audioRef.value
    playStatus.value.paused = !playStatus.value.paused
    if (playStatus.value.paused) {
        audio.pause()
    } else {
        if (!queue.value?.current) {
            if (showToast) showToast('播放队列还没有内容')
            playStatus.value.paused = true
            return
        }
        try {
            await audio.play()
        } catch (error) {
            if (showToast) showToast('TAT 播放出错')
            console.error(error)
            playStatus.value.paused = true
        }
    }
}

// 上一首
function prevTrack() {
    const _queue = queue.value
    if (playModeList[playMode.value]?.mode === 'Random') {
        randomPlay()
    } else {
        queue.value!.current = _queue?.queue[(_queue?.queue.indexOf(_queue.current!) - 1 + _queue.queue.length) % _queue.queue.length]
    }
}

// 下一首
function nextTrack() {
    const _queue = queue.value
    if (playModeList[playMode.value]?.mode === 'Random') {
        randomPlay()
    } else {
        queue.value!.current = _queue?.queue[(_queue?.queue.indexOf(_queue.current!) + 1) % _queue.queue.length]
    }
}
provide('nextTrack', nextTrack)

// 随机切换
function randomPlay() {
    const _queue = queue.value
    const randomTrack = _queue?.queue[Math.floor(Math.random() * _queue.queue.length)]
    // 跳过重复曲目
    if (randomTrack === _queue?.current) {
        randomPlay()
    } else {
        queue.value!.current = randomTrack
    }
}

// 切换曲目更新自动暂停状态
watch(() => queue.value?.current?.id, () => {
    playStatus.value.paused = true
})

// 调整进度
function updateProgress(e: InputEvent) {
    const value = Number((e.target as HTMLInputElement).value)
    audioRef.value.currentTime = value
}

// 调整音量
function updateVolume(e: InputEvent) {
    const value = Number((e.target as HTMLInputElement).value)
    audioRef.value.volume = value
}

// 更新媒体信息
function updateMediaMetadata(currentTrack: Track | undefined) {
    if (currentTrack) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentTrack.name,
            artist: currentTrack.artists.map(({ name }) => name).join(' & '),
            album: currentTrack.album.name,
            artwork: [{
                src: currentTrack.album.cover
            }]
        })
    } else {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'RhythmInn',
            artist: 'Burger Studio',
            album: 'RhythmInn',
            artwork: [{
                src: favicon
            }]
        })
    }
}

onMounted(() => {
    // 开始监听音频状态
    const audio = audioRef.value
    audio.addEventListener('play', () => {
        playStatus.value.paused = false
    })
    audio.addEventListener('pause', () => {
        playStatus.value.paused = true
    })
    audio.addEventListener('ended', () => {
        const _playMode = playModeList[playMode.value]?.mode
        if (_playMode === 'LoopOne') {
            audio.currentTime = 0
        } else if (queue.value?.queue.length === 1 && (_playMode === 'LoopAll' || _playMode === 'Random')) { // 随机播放有避免重复规则，不加处理时在只有一首曲目的队列中会引发无限回调
            audio.currentTime = 0
        } else {
            nextTrack()
        }
    })
    audio.addEventListener('timeupdate', () => {
        playStatus.value.currentTime = audio.currentTime
        timeStr.value.current = processDuration(Math.floor(audio.currentTime) * 1000)
    })
    audio.addEventListener('canplay', () => {
        if (audio.paused) {
            playStatus.value.paused = true
            playPause()
        }
    })
    audio.addEventListener('durationchange', () => {
        playStatus.value.duration = audio.duration
        timeStr.value.full = processDuration(Math.floor(audio.duration) * 1000)
    })
    // Media Session API​ 提供媒体信息
    updateMediaMetadata(undefined)
    watch(() => queue.value?.current, updateMediaMetadata)
    // 绑定媒体操作按钮
    navigator.mediaSession.setActionHandler('previoustrack', prevTrack)
    navigator.mediaSession.setActionHandler('nexttrack', nextTrack)
})
</script>
<template>
    <div class="playing-container">
        <div class="track-info-area">
            <div class="track-cover">
                <div class="track-cover-img-container">
                    <CoverTransition>
                        <img :src="queue?.current ? queue.current.album.cover : favicon"
                            :key="queue?.current ? queue?.current.id : -1">
                    </CoverTransition>
                </div>
            </div>
            <div class="track-name-container">
                <NameTransition>
                    <div :key="queue?.current ? queue?.current.id : -1"
                        style="position: absolute;width: 100%;display: flex;flex-direction: column;align-items: center;">
                        <div class="track-name">{{ queue?.current ?
                            queue.current.name : 'RhythmInn' }}</div>
                        <div class="track-artists">{{queue?.current ? queue.current.artists.map(({ name }) => name)
                            .join(' & ') : 'Burger Studio'}}</div>
                    </div>
                </NameTransition>
            </div>
        </div>
        <div class="media-control-area">
            <Slider style="width: 100%;margin: 0;" min="0" :max="playStatus.duration" v-model="playStatus.currentTime"
                @input="updateProgress" />
            <div style="display: flex;opacity: 0.8;font-size: 14px;">
                <div style="flex-grow: 1;">{{ timeStr.current }}</div>
                <div style="text-align: right;flex-grow: 1;">{{ timeStr.full }}</div>
            </div>
            <div style="display: flex;justify-content: center;width: 100%;">
                <div style="margin-top: 16px;display: flex;flex-grow: 1;">

                    <TransparentIconButton :icon="playModeList[playMode]!.icon" @click="switchPlayMode()">
                    </TransparentIconButton>

                    <TransparentIconButton :icon="skipPreviousIcon" style="margin-left: auto;" @click="prevTrack()">
                    </TransparentIconButton>
                    <PrimaryIconButton :icon="playStatus.paused ? playArrowIcon : pauseIcon" style="margin: 0 8px;"
                        class="btn-play" @click="playPause()"></PrimaryIconButton>
                    <TransparentIconButton :icon="skipNextIcon" @click="nextTrack()"></TransparentIconButton>

                    <TransparentIconButton :icon="queueMusicIcon" style="margin-left: auto;" @click="hideQueue = false">
                    </TransparentIconButton>
                </div>
            </div>
            <div class="volume-area">
                <div style="display: flex;align-items: center;justify-content: center;width: 32px;">
                    <img :src="volumeUpIcon" style="width: 24px; height: 24px;opacity: 0.5;">
                </div>
                <Slider style="flex-grow: 1;" min="0" max="1" step="0.01" v-model="volume" @input="updateVolume" />
            </div>
        </div>
    </div>
    <PlayQueue v-model:hidden="hideQueue" v-model:queue="queue" />
    <BackgroundTransition>
        <div class="player-background" :key="queue?.current ? queue?.current.id : -1"
            v-if="settings?.playerBg === 'on'">
            <img :src="queue?.current ? queue.current.album.cover : undefined">
        </div>
    </BackgroundTransition>
    <audio style="display: none;" ref="audioRef"
        :src="`https://music.163.com/song/media/outer/url?id=${queue?.current?.id}.mp3`"></audio>
</template>
<style scoped>
.playing-container {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.track-info-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    word-wrap: break-word;
    word-break: break-all;
}

.track-cover {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 32px;
}

.track-cover-img-container {
    width: 200px;
    height: 200px;
}

.track-cover img {
    position: absolute;
    width: 200px;
    height: 200px;
}

.track-name-container {
    width: 100%;
}

.track-name {
    font-size: 20px;
}

.track-artists {
    font-size: 16px;
    opacity: 0.8;
}

.media-control-area {
    margin-top: auto;
    margin-bottom: 50px;
    padding: 0 32px;
}

.volume-area {
    display: flex;
    margin-top: 16px;
}

.player-background {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.player-background img {
    height: calc(100% + 100px);
    opacity: 0.25;
    filter: blur(32px);
}

/* 深色主题 */
.body-theme-dark .volume-area img {
    filter: invert(1);
}

.body-theme-dark .btn-play {
    background: var(--indigo-400);
}

@media(prefers-color-scheme: dark) {
    .body-theme-system .volume-area img {
        filter: invert(1);
    }

    .body-theme-system .btn-play {
        background: var(--indigo-400);
    }
}
</style>