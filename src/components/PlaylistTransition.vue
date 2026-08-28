<template>
    <TransitionGroup name="playlist">
        <slot></slot>
    </TransitionGroup>
</template>
<style>
.playlist-move,
.playlist-enter-active,
.playlist-leave-active {
    transition: 0.3s var(--easeOutCirc);
    pointer-events: none;
    transform-origin: top center;
}

.playlist-enter-from,
.playlist-leave-to {
    /* opacity: 0; */
}

.playlist-leave-active {
    position: absolute;
    pointer-events: none;
    left: 8px;
    right: 8px;
}
</style>