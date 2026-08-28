// 时长转换
export function processDuration(timestamp: number) {
    const minutes = String(Math.floor(timestamp / 1000 / 60)).padStart(2, '0')
    const seconds = String(Math.floor(timestamp / 1000 % 60)).padStart(2, '0')
    return `${minutes}:${seconds}`
}