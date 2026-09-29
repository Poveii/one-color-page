import { useCallback, useEffect, useRef } from "react"

export function useWakeLock() {
  let supported = false

  if ("wakeLock" in navigator) {
    supported = true
  }

  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  const lockScreen = useCallback(async () => {
    if (
      !supported ||
      document.visibilityState !== "visible" ||
      wakeLockRef.current
    ) {
      return
    }

    try {
      const wakeLock = await navigator.wakeLock.request("screen")
      wakeLockRef.current = wakeLock

      wakeLockRef.current.addEventListener("release", () => {
        if (wakeLockRef.current === wakeLock) {
          wakeLockRef.current = null
        }
      })
    } catch (error) {
      console.error("It was not possible to enable Wake Lock API: ", error)
    }
  }, [])

  const unlockScreen = useCallback(async () => {
    const wakeLock = wakeLockRef.current
    wakeLockRef.current = null

    await wakeLock?.release()
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void lockScreen()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      )
      void unlockScreen()
    }
  }, [lockScreen, unlockScreen])

  return {
    lockScreen,
    unlockScreen,
  }
}
