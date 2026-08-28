<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import HorizontalSelect from './HorizontalSelect.vue'
import Link from './Link.vue'
import favicon from '/favicon.ico'
import { settings } from './settings.ts'

// 主题选择
const themeOptions = [
    { value: 'system', label: '系统' },
    { value: 'light', label: '浅色' },
    { value: 'dark', label: '深色' }
]
const themeSelected = ref('')

// 播放页背景开关
const playerBgOptions = [
    { value: 'on', label: '开' },
    { value: 'off', label: '关' }
]
const playerBgSelected = ref('')

onMounted(() => {
    if (settings.value) {
        themeSelected.value = settings.value.theme
        playerBgSelected.value = settings.value.playerBg
    }
    // 监听设置更改
    watch(themeSelected, () => {
        if (settings.value) {
            settings.value.theme = themeSelected.value
        }
    })

    watch(playerBgSelected, () => {
        if (settings.value) {
            settings.value.playerBg = playerBgSelected.value
        }
    })
})
</script>
<template>
    <div class="settings">
        <div class="subtitle" style="margin-top: 0;">关于本项目</div>
        <div class="project-info">
            <img :src="favicon" class="project-icon">
            <div class="project-name-and-version">
                <div class="project-name">拾音栈 - RhythmInn</div>
                <div class="project-version">Version 1.0.0</div>
            </div>
        </div>
        <div style="margin-top: 16px;">本项目基于 MIT 许可证开源。 </div>
        <div style="margin-top: 8px;">Copyright © 2026 Burger Studio.</div>
        <div style="margin-top: 16px;">
            查看原歌单：
            <Link href="https://music.163.com/playlist?id=8417254609">PURE - 纯音</Link>
        </div>
        <div style="margin-top: 8px;">
            GitHub：
            <Link href="https://github.com/BGStudio2021/RhythmInn">BGStudio2021/RhythmInn</Link>
        </div>
        <div class="subtitle">偏好设置</div>
        <div>主题</div>
        <HorizontalSelect name="theme" :options="themeOptions" style="margin-top: 16px;" v-model="themeSelected" />
        <div style="margin-top: 16px;">播放页背景</div>
        <HorizontalSelect name="playerBg" :options="playerBgOptions" style="margin-top: 16px;"
            v-model="playerBgSelected" />
    </div>
</template>
<style scoped>
.settings {
    padding: 8px 32px 16px 32px;
}

.project-info {
    display: flex;
    align-items: center;
    gap: 16px;
}

.project-icon {
    width: 42px;
    height: 42px;
}

.project-name-and-version {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.project-name {
    font-size: 16px;
}

.project-version {
    font-size: 14px;
    opacity: 0.8;
}

.subtitle {
    margin: 32px 0 16px 0;
    font-size: 18px;
}
</style>