<template>
    <Transition name="name">
        <slot></slot>
    </Transition>
</template>
<style>
.name-enter-active,
.name-leave-active {
    transition: 0.5s var(--easeOutCirc);
}

.name-enter-from {
    opacity: 0;
    transform: translateX(-128px);
}

.name-leave-to {
    opacity: 0;
    transform: translateX(128px);
}
</style>