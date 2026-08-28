<template>
    <TransitionGroup name="queue">
        <slot></slot>
    </TransitionGroup>
</template>
<style>
.queue-move,
.queue-enter-active,
.queue-leave-active {
    transition: 0.3s var(--easeOutCirc);
    pointer-events: none;
    transform-origin: top center;
}

.queue-enter-from,
.queue-leave-to {
    opacity: 0;
    transform: scale(0.85);
}

.queue-leave-active {
    position: absolute;
    pointer-events: none;
    left: 8px;
    right: 8px;
}
</style>