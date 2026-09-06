<script setup lang="ts">
import albumIcon from '../assets/icons/album.svg'
import playlistPlayIcon from '../assets/icons/playlist_play.svg'
import musicNoteIcon from '../assets/icons/music_note.svg'
import { useTouchOptimize } from './touchOptimize.ts'
const { pressed: touchPressed, press: touchPress, lift: touchLift } = useTouchOptimize()

// 移动选项卡
const currentMobileTab = defineModel('currentMobileTab')
const tabList = [
    { key: 'sidebar', icon: albumIcon, label: '音乐分类' },
    { key: 'playlist', icon: playlistPlayIcon, label: '播放列表' },
    { key: 'playing', icon: musicNoteIcon, label: '正在播放' }
]
</script>
<template>
    <div class="bottom-navigation">
        <div class="bottom-navigation-item" v-for="tab in tabList"
            :class="{ 'bottom-navigation-item-active': currentMobileTab === tab.key, 'bottom-navigation-item-touch-active': touchPressed === tab.key }"
            @click="currentMobileTab = tab.key" @touchstart="touchPress(tab.key)" @touchend="touchLift()">
            <img class="bottom-navigation-item-icon" :src="tab.icon">
            <div class="bottom-navigation-item-text">{{ tab.label }}</div>
        </div>
    </div>
</template>
<style scoped>
.bottom-navigation {
    display: flex;
    width: 100vw;
    height: 48px;
    background: var(--indigo-primary-dynamic);
}

.bottom-navigation-item {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    color: #fff;
}

.bottom-navigation-item:hover,
.bottom-navigation-item-active {
    background: var(--hover-light);
}

.bottom-navigation-item:active,
.bottom-navigation-item-touch-active {
    background: var(--active-light) !important;
}

.bottom-navigation-item-icon {
    width: 24px;
    height: 24px;
    filter: invert(1);
}

.bottom-navigation-item-text {
    font-size: 15px;
}
</style>