import { useEffect, useState } from "react"

export function useBodyMouseMove(
  parentRef: React.RefObject<HTMLDivElement | null>
) {
  const [mouseActive, setMouseActive] = useState(false)

  useEffect(() => {
    const parent = parentRef?.current

    let timeout: ReturnType<typeof setTimeout>
    function handleMouseMove() {
      if (!parent) return
      setMouseActive(true)

      parent.classList.add("group")
      parent.classList.remove("cursor-none")

      clearTimeout(timeout)

      const THREE_SECONDS = 3000
      timeout = setTimeout(() => {
        parent.classList.remove("group")
        parent.classList.add("cursor-none")
      }, THREE_SECONDS)
    }

    document.body.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeout)
    }
  }, [parentRef])

  return mouseActive
}
