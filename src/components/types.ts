// 单曲
export interface Track {
    name: string,
    id: number,
    artists: { name: string, id: number }[],
    album: { name: string, id: number, cover: string },
    duration: number
}
// 播放队列
export interface Queue {
    queue: Track[],
    current: Track | undefined
}