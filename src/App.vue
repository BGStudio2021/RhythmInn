<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import { provide, ref } from 'vue'
import Playlist from './components/Playlist.vue'
import Playing from './components/Playing.vue'
import Toast from './components/Toast.vue'
import type { Track, Queue } from './components/types.ts'
import playlistDataArtists from './assets/playlist-artists.json'
import playlistDataSongs from './assets/playlist-songs.json'
import BottomNavigation from './components/BottomNavigation.vue'

// 初始化播放列表
const playlistArtists = ref(playlistDataArtists)
const playlistSongs = ref(playlistDataSongs)
const playlistTitle = ref('')
const playlistSubtitle = ref('')
const currentPlaylist = ref()
const currentTab = ref('')
const toastRef = ref()
const queue = ref<Queue>({ queue: [], current: undefined })
const childMethods = ref<Record<string, Function>>({})
const isMobileScreen = ref(false)
const currentMobileTab = ref('sidebar')
const searchBarFocusMark = ref(false)

// 响应式页面实现
window.addEventListener('load', () => {
  updateScreenType()
})

window.addEventListener('resize', () => {
  updateScreenType()
})

function updateScreenType() {
  isMobileScreen.value = window.innerWidth <= 720
}

// Toast 显示方法
function showToast(msg: string) {
  toastRef.value.show(msg)
}
provide('showToast', showToast)

// 向播放队列添加曲目
function addToQueue(track: Track, options = { toast: true, playNow: false }) {
  const _queue = queue.value
  const lastTrack = _queue.current
  // 立即播放
  if (options.playNow) {
    queue.value.current = track
  }
  if (_queue.queue.find((_track: Track) => _track.id === track.id)) {
    if (options.toast) showToast('曲目已存在于播放队列')
    return
  }
  queue.value.queue.splice(_queue.queue.indexOf(lastTrack!) + 1, 0, track) // 添加到正在播放的下一首
  if (childMethods.value['scrollToQueueTrack']) {
    childMethods.value['scrollToQueueTrack'](track) // 定位到添加的曲目
  }
  if (options.toast) showToast('已添加到播放队列')
}
provide('addToQueue', addToQueue)

// 子组件注册方法
function registerMethod(name: string, fn: Function) {
  childMethods.value[name] = fn
}
provide('registerMethod', registerMethod)
</script>
<template>
  <Toast ref="toastRef"></Toast>
  <!-- 移动端页面 -->
  <div v-if="isMobileScreen">
    <div class="container-mobile">
      <div class="tab-content-mobile"
        :class="{ 'tab-content-mobile-playlist': currentMobileTab === 'playlist', 'tab-content-mobile-playing': currentMobileTab === 'playing' }">
        <div class="sidebar-mobile">
          <Sidebar v-model:playlist-title="playlistTitle" v-model:playlist-subtitle="playlistSubtitle"
            v-model:current-playlist="currentPlaylist" v-model:current-tab="currentTab" :playlist-songs="playlistSongs"
            :playlist-artists="playlistArtists" v-model:current-mobile-tab="currentMobileTab"
            v-model:search-bar-focus-mark="searchBarFocusMark" />
        </div>
        <div class="playlist-mobile">
          <Playlist v-model:title="playlistTitle" v-model:subtitle="playlistSubtitle" v-model:playlist="currentPlaylist"
            :current-tab="currentTab" v-model:queue="queue" v-model:current-mobile-tab="currentMobileTab"
            v-model:search-bar-focus-mark="searchBarFocusMark" />
        </div>
        <div class="playing-mobile">
          <Playing v-model:queue="queue" v-model:current-mobile-tab="currentMobileTab" />
        </div>
      </div>
      <BottomNavigation v-model:current-mobile-tab="currentMobileTab" />
    </div>
  </div>
  <!-- 桌面端页面 -->
  <div v-else>
    <div class="container">
      <div class="sidebar">
        <Sidebar v-model:playlist-title="playlistTitle" v-model:playlist-subtitle="playlistSubtitle"
          v-model:current-playlist="currentPlaylist" v-model:current-tab="currentTab" :playlist-songs="playlistSongs"
          :playlist-artists="playlistArtists" v-model:search-bar-focus-mark="searchBarFocusMark" />
      </div>
      <div class="playlist">
        <Playlist v-model:title="playlistTitle" v-model:subtitle="playlistSubtitle" v-model:playlist="currentPlaylist"
          :current-tab="currentTab" v-model:queue="queue" v-model:search-bar-focus-mark="searchBarFocusMark" />
      </div>
      <div class="playing">
        <Playing v-model:queue="queue" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 20%;
  background: var(--indigo-primary-dynamic);
}

.playlist {
  position: relative;
  width: 50%;
}

.playing {
  position: relative;
  width: 30%;
}

.container-mobile {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.tab-content-mobile {
  display: flex;
  width: 300vw;
  height: calc(100% - 48px);
  transition: 0.5s var(--easeOutCirc);
}

.tab-content-mobile-playlist {
  transform: translateX(-100vw);
}

.tab-content-mobile-playing {
  transform: translateX(-200vw);
}

.sidebar-mobile {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--indigo-primary-dynamic);
}

.playlist-mobile {
  position: relative;
  width: 100%;
  height: 100%;
}

.playing-mobile {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>