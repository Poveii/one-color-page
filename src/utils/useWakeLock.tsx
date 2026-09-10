import { useState } from "react"

export function useWakeLock() {
  let supported = false

  if ("wakeLock" in navigator) {
    supported = true
  }

  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null)

  async function lockScreen() {
    if (!supported) return
    try {
      setWakeLock(await navigator.wakeLock.request("screen"))
    } catch (error) {
      console.error(error)
    }
  }

  async function unlockScreen() {
    if (wakeLock == null) return
    wakeLock.release().then(() => {
      setWakeLock(null)
    })
  }

  return [
    lockScreen,
    unlockScreen,
  ]
}