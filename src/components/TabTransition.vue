<template>
    <Transition name="tab">
        <slot></slot>
    </Transition>
</template>
<style>
.tab-enter-active,
.tab-leave-active {
    transition: 0.3s var(--easeOutCirc);
}

.tab-enter-from {
    opacity: 0;
    transform: translateX(-32px);
}

.tab-leave-to {
    opacity: 0;
    transform: translateX(32px);
}
</style>