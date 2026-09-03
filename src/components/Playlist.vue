<script setup lang="ts">
import TrackComponent from './Track.vue'
import TabTransition from './TabTransition.vue'
import Input from './Input.vue'
import searchIcon from '../assets/icons/search.svg'
import { computed, inject, nextTick, ref, watch } from 'vue'
import playlistDataSongs from '../assets/playlist-songs.json'
import playArrowIcon from '../assets/icons/play_arrow.svg'
import type { Queue, Track } from './types.ts'
import PrimaryIconButton from './PrimaryIconButton.vue'
import SecondaryIconButton from './SecondaryIconButton.vue'
import myLocationIcon from '../assets/icons/my_location.svg'
import Settings from './Settings.vue'
import Pagination from './Pagination.vue'

const props = defineProps<{
    currentTab: string
}>()

const playlistSongs = ref(playlistDataSongs)
const title = defineModel('title')
const subtitle = defineModel('subtitle')
const playlist = defineModel<Track[]>('playlist')
const searchKeywords = defineModel({ default: '' })
const queue = defineModel<Queue>('queue')
const SearchBar = ref()
const contentAreaRef = ref()
const showToast = inject<(msg: string) => void>('showToast')
const locateBtnDisabled = ref(true) // 定位按钮禁用状态
// 页码按钮显示状态
const paginationVisible = computed(() => {
    if (props.currentTab.indexOf('all') !== -1 || props.currentTab.indexOf('artist') !== -1) {
        if (playlist.value && playlist.value.length > 100) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
})
const currentPage = ref(1)
// 当前页播放列表切片
const playlistSlice = computed(() => {
    if (playlist.value && playlist.value.length > 100) {
        const start = 100 * (currentPage.value - 1)
        const end = Math.min(100 * currentPage.value, playlist.value.length)
        return playlist.value.slice(start, end)
    } else {
        return playlist.value
    }
})

// 自动聚焦搜索框
watch(() => props.currentTab, async () => {
    if (props.currentTab === 'search') {
        searchKeywords.value = ''
        playlist.value = []
        await nextTick()
        SearchBar.value.focus()
    }
})

// 搜索
watch(searchKeywords, (value) => {
    if (value.length === 0) {
        playlist.value = []
        subtitle.value = `搜索音乐`
        return
    }
    const lowerValue = value.toLowerCase()
    const searchResult: Track[] = playlistSongs.value.filter((track) => {
        if (track.name.toLowerCase().indexOf(lowerValue) != -1) {
            return track
        } else if (track.artists.map(({ name }) => name).join('').toLowerCase().indexOf(lowerValue) != -1) {
            return track
        } else if (track.album.name.toLowerCase().indexOf(lowerValue) != -1) {
            return track
        }
    })
    playlist.value = searchResult
    subtitle.value = `${searchResult.length} 个结果`
})

// 播放全部
function playAll() {
    queue.value!.queue = []
    playlist.value?.forEach((track: Track) => {
        queue.value?.queue.push(track)
    })
    queue.value!.current = playlist.value![0]!
    if (showToast) { showToast('已更换播放队列') }
}

// 定位到曲目
function scrollToPlaylistTrack(track: Track) {
    // 存在分页时自动跳转到所在页面
    if (playlist.value && playlist.value.length > 100) {
        const index = playlist.value.findIndex((_track: Track) => _track.id === track.id)
        currentPage.value = Math.ceil((index + 1) / 100)
    }
    setTimeout(() => {
        const target = document.querySelector(`[playlist-track-id='${track.id}']`)
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    })
}

// 定位到当前曲目
function scrollToCurrentTrack() {
    const currentTrack = queue.value?.current
    if (currentTrack) {
        scrollToPlaylistTrack(currentTrack)
    }
}

// 滚动到播放列表顶部
function scrollToTop() {
    const contentArea = contentAreaRef.value
    contentArea.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// 更新定位按钮禁用状态
function updateLocateBtn() {
    if (queue.value?.current && playlist.value?.length != 0) {
        if (playlist.value?.find((track) => track.id === queue.value?.current?.id)) {
            locateBtnDisabled.value = false
        } else {
            locateBtnDisabled.value = true
        }
    } else {
        locateBtnDisabled.value = true
    }
}

watch(() => playlist.value, () => {
    currentPage.value = 1 // 播放列表变化时，将页码复原
    updateLocateBtn()
})

watch(() => queue.value?.current, () => {
    updateLocateBtn()
})

watch(() => currentPage.value, () => {
    scrollToTop() // 翻页时自动滚动到顶部
})
</script>
<template>
    <TabTransition>
        <div class="playlist-container" :key="currentTab">
            <div class="title-area">
                <div style="display: flex;">
                    <div style="display: flex;flex-direction: column;flex-grow: 1;">
                        <div class="title">{{ title }}</div>
                        <div class="subtitle">{{ subtitle }}</div>
                    </div>
                    <div style="display: flex;align-items: center;" v-if="currentTab !== 'settings'">
                        <SecondaryIconButton :icon="myLocationIcon" style="margin-right: 8px;" icon-size="small"
                            @click="scrollToCurrentTrack()" :disabled="locateBtnDisabled">
                        </SecondaryIconButton>
                        <PrimaryIconButton :icon="playArrowIcon" @click="playAll()" :disabled="!playlist?.length">
                        </PrimaryIconButton>
                    </div>
                </div>
                <div style="width: 100%;height: 16px;" v-if="subtitle"></div>
                <Input v-model="searchKeywords" v-if="currentTab === 'search'" style="width: 100%;"
                    :placeholder="'音乐标题 / 作者 / 专辑'" :icon="searchIcon" ref="SearchBar" />
                <Pagination v-if="paginationVisible" v-model:playlist="playlist" v-model:current-page="currentPage" />
            </div>
            <div class="content-area" ref="contentAreaRef">
                <div v-if="currentTab === 'settings'">
                    <Settings />
                </div>
                <div v-if="currentTab !== 'settings'">
                    <div class="playlist">
                        <TrackComponent v-for="(track, index) in playlistSlice" :number="index + 1" :info="track"
                            v-model:queue="queue" :playlist-track-id="track.id" />
                    </div>
                </div>
            </div>
        </div>
    </TabTransition>
</template>
<style scoped>
.playlist-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.title-area {
    top: 0;
    width: calc(100% - 40px);
    padding: 32px 16px 16px 16px;
    margin: 0 24px 0 16px;
    /* 右边多出 8px 给滚动条腾出空间，方便对齐 */
    box-sizing: border-box;
    background: var(--indigo-background);
    z-index: 1;
}

.title {
    font-size: 28px;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 16px;
    opacity: 0.8;
}

.content-area {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
}

.playlist {
    margin-bottom: 16px;
}

.content-area::-webkit-scrollbar {
    background: transparent;
    width: 8px;
}

.content-area::-webkit-scrollbar-thumb {
    background: var(--hover-dark-dynamic);
}

.content-area::-webkit-scrollbar-thumb:hover {
    background: var(--active-dark-dynamic);
}

.content-area::-webkit-scrollbar-thumb:active {
    background: var(--active-darker-dynamic);
}
</style>