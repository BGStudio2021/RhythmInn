<script setup lang="ts">
import RhythmInnTitle from '../assets/RhythmInn-Title.png'
import searchIcon from '../assets/icons/search.svg'
import SidebarItem from './SidebarItem.vue'
import musicNoteIcon from "../assets/icons/music_note.svg"
import personIcon from '../assets/icons/person.svg'
import { onMounted, ref } from 'vue'
import playlistDataArtists from '../assets/playlist-artists.json'
import playlistDataSongs from '../assets/playlist-songs.json'
import settingsIcon from '../assets/icons/settings.svg'

// 初始化播放列表
const playlistArtists = ref(playlistDataArtists)
const playlistSongs = ref(playlistDataSongs)
// 选项卡
const currentTab = defineModel('currentTab')
function openTab(tab: string, title: string, subtitle?: string) {
    currentTab.value = tab
    playlistTitle.value = title
    playlistSubtitle.value = subtitle
}
// 绑定启动画面显示状态
const hideSplash = defineModel('hideSplash')
// 绑定播放列表标题、副标题
const playlistTitle = defineModel('playlistTitle')
const playlistSubtitle = defineModel('playlistSubtitle')
// 绑定当前打开的播放列表
const currentPlaylist = defineModel('currentPlaylist')

onMounted(() => {
    // 加载完成后自动隐藏启动画面
    setTimeout(() => {
        hideSplash.value = true
    }, 100)
    openTab('all', '全部音乐', `${playlistSongs.value.length} 首音乐`)
    currentPlaylist.value = playlistSongs.value
})
</script>
<template>
    <div class="title-area">
        <img :src="RhythmInnTitle" alt="RhythmInn-Title">
    </div>
    <SidebarItem :icon="searchIcon" :active="currentTab === 'search'"
        @click="openTab('search', '搜索', '搜索音乐'); currentPlaylist = []">搜索
    </SidebarItem>
    <SidebarItem :icon="musicNoteIcon" :active="currentTab === 'all'"
        @click="openTab('all', '全部音乐', `${playlistSongs.length} 首音乐`); currentPlaylist = playlistSongs">全部音乐
    </SidebarItem>
    <SidebarItem :icon="settingsIcon" :active="currentTab === 'settings'" @click="openTab('settings', '设置')">设置
    </SidebarItem>
    <div class="sidebar-subtitle">按作者整理</div>
    <div class="sidebar-scroll-area">
        <SidebarItem :icon="personIcon" v-for="artist in playlistArtists" style="margin-right: 0;"
            :active="currentTab === `artist_${artist.id}`"
            @click="openTab(`artist_${artist.id}`, artist.name, `${artist.tracks.length} 首音乐`); currentPlaylist = artist.tracks">
            {{
                artist.name }}
        </SidebarItem>
    </div>
</template>
<style scoped>
.title-area {
    width: 100%;
    text-align: center;
}

.title-area img {
    width: 50%;
    margin: 24px 0 16px 0;
}

.sidebar-subtitle {
    color: #fff;
    font-size: 14px;
    opacity: 0.8;
    margin: 8px 16px;
}

.sidebar-scroll-area {
    flex-grow: 1;
    overflow-y: overlay;
    padding-bottom: 8px;
}

.sidebar-scroll-area::-webkit-scrollbar {
    background: transparent;
    width: 8px;
}

.sidebar-scroll-area::-webkit-scrollbar-thumb {
    background: var(--scrollbar-light);
}

.sidebar-scroll-area::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-light-hover);
}

.sidebar-scroll-area::-webkit-scrollbar-thumb:active {
    background: var(--scrollbar-light-active);
}
</style>