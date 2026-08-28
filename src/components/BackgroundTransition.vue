<template>
    <Transition name="background">
        <slot></slot>
    </Transition>
</template>
<style>
.background-enter-active,
.background-leave-active {
    transition: 0.5s var(--easeOutCirc);
}

.background-enter-from,
.background-leave-to {
    opacity: 0;
}
</style>