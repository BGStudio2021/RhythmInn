// 应用设置

import { ref, watchEffect } from "vue"

interface Settings {
    theme: string,
    playerBg: string
}

const settings = ref<Settings>()

// 初始化
if (!localStorage.settings) {
    settings.value = { theme: 'system', playerBg: 'on' }
    localStorage.settings = JSON.stringify(settings.value)
} else {
    settings.value = JSON.parse(localStorage.settings)
}

updateTheme()

// 自动更新
watchEffect(() => {
    const _settings = settings.value
    if (_settings) {
        localStorage.settings = JSON.stringify(settings.value)
        updateTheme()
    }
})

// 刷新主题
function updateTheme() {
    const theme = settings.value?.theme
    if (theme === 'system') {
        document.body.classList.remove('body-theme-dark')
        document.body.classList.add('body-theme-system')
    } else if (theme === 'dark') {
        document.body.classList.remove('body-theme-system')
        document.body.classList.add('body-theme-dark')
    } else {
        document.body.classList.remove('body-theme-system')
        document.body.classList.remove('body-theme-dark')
    }
}

export { settings }