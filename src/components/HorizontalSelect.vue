<script setup lang="ts">const props = defineProps<{
    name: string,
    options: {
        value: string,
        label: string
    }[]
}>()

const selected = defineModel()
</script>
<template>
    <div class="horizontal-select">
        <label class="horizontal-select-option" v-for="option in options" :for="option.value"
            :class="{ 'horizontal-select-option-selected': selected === option.value }">{{ option.label }}</label>
        <input type="radio" :name="name" v-for="option in options" :value="option.value" :id="option.value"
            style="display: none;" v-model="selected">
    </div>
</template>
<style scoped>
.horizontal-select {
    display: flex;
    border: 2px solid var(--indigo-primary);
    width: fit-content;
}

.horizontal-select-option {
    padding: 4px 16px;
    font-size: 16px;
    min-width: 64px;
    text-align: center;
}

.horizontal-select-option:hover {
    background: var(--hover-dark-dynamic);
}

.horizontal-select-option:active {
    background: var(--active-dark-dynamic);
}

.horizontal-select-option-selected {
    background: var(--indigo-primary) !important;
    color: #fff !important;
}
</style>