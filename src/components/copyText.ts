// 复制文本
export function copyText(content: string) {
    let copy = (e: ClipboardEvent) => {
        e.preventDefault();
        e.clipboardData?.setData('text/plain', content);
        document.removeEventListener('copy', copy);
    }
    document.addEventListener('copy', copy);
    document.execCommand("Copy");
}