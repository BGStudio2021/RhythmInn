import { ref } from "vue"

// 触摸屏优化

export function useTouchOptimize() {
    const pressed = ref<string | number>('')

    function press(id: string | number) {
        pressed.value = id
    }

    function lift() {
        setTimeout(() => {
            pressed.value = ''
        }, 100)
    }
    return { pressed, press, lift }
}