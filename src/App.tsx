import { ChangeEvent, MouseEvent, useState } from "react"
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"

type MouseMoveType = MouseEvent<HTMLDivElement> & { target: Element }

function App() {
  const [color, setColor] = useState("#FFFFFF")
  const [mouseActive, setMouseActive] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  let removeMouseTimeout: ReturnType<typeof setTimeout>
  function handleMouseMovement(event: MouseMoveType) {
    setMouseActive(true)

    event.target.classList.remove("cursor-none")
    event.target.classList.add("group")

    const THREE_SECONDS = 3000;
    (function () {
      clearTimeout(removeMouseTimeout)
      removeMouseTimeout = setTimeout(() => {
        event.target.classList.remove("group")
        event.target.classList.add("cursor-none")
      }, THREE_SECONDS)
    })()
  }

  return (
    <div
      className="h-screen grid place-content-center relative"
      style={{ backgroundColor: color }}
      onMouseMove={handleMouseMovement}
    >
      <h1
        className={"font-bold text-2xl opacity-0 invisible transition-all" + (mouseActive ? " group-hover:opacity-100 group-hover:visible" : " !visible !opacity-100")}
      >
        One Color Page
      </h1>

      <Card className={"absolute right-8 bottom-8 p-8 space-y-4 dark opacity-0 invisible transition-all" + (mouseActive ? " group-hover:opacity-100 group-hover:visible" : " !visible !opacity-100")}>
        <CardTitle>Escolha uma cor</CardTitle>
        <CardContent className="p-0">
          <input 
            type="color"
            id="background"
            onChange={handleChange}
            value={color}
            className="appearance-none w-full h-16 bg-transparent border-none cursor-pointer rounded-lg"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default App
