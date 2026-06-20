export function startCountdown(getSecondsLeft: () => number, setSecondsLeft: (s: number) => void, callback: () => void) {
    return setInterval(() => {
        setSecondsLeft(Math.round((getSecondsLeft() - 0.1) * 100) / 100)
        if (getSecondsLeft() <= 0) callback()
    }, 100)
}