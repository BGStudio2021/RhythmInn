<script setup lang="ts">
import type { Track } from './types.ts'
import PrimaryIconButton from './PrimaryIconButton.vue'
import SecondaryIconButton from './SecondaryIconButton.vue'
import { computed } from 'vue'

const currentPage = defineModel('currentPage')
const playlist = defineModel<Track[]>('playlist')
const totalPages = computed(() => {
    if (playlist.value) {
        return Math.ceil(playlist.value.length / 100)
    }
})
</script>
<template>
    <div class="pagination-container">
        <component v-for="pageNum in totalPages" @click="currentPage = pageNum"
            :is="(currentPage === pageNum) ? PrimaryIconButton : SecondaryIconButton" style="margin:2px 4px;">
            <div style="width: 24px;height: 24px;display: flex;justify-content: center;align-items: center;">{{ pageNum
            }}</div>
        </component>
    </div>
</template>
<style scoped>
.pagination-container {
    display: flex;
    overflow-x: auto;
}

.pagination-container::-webkit-scrollbar {
    background: transparent;
    height: 4px;
}

.pagination-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
}

.pagination-container::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.35);
}

.pagination-container::-webkit-scrollbar-thumb:active {
    background: rgba(255, 255, 255, 0.45);
}
</style>