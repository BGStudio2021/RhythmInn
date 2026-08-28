<template>
    <Transition name="cover">
        <slot></slot>
    </Transition>
</template>
<style>
.cover-enter-active,
.cover-leave-active {
    transition: 0.5s var(--easeOutCirc);
}

.cover-enter-from {
    opacity: 0;
    transform: translateX(-128px) scale(1.25);
}

.cover-leave-to {
    opacity: 0;
    transform: translateX(128px) scale(0.75);
}
</style>