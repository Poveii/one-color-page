import { ChangeEvent, useState } from "react"
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"

function App() {
  const [color, setColor] = useState("#FFFFFF")
  const [isMouseActive, setIsMouseActive] = useState(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  function handleMouseMovement() {
    setTimeout(() => {
      setIsMouseActive(false)
    }, 5000);
    setIsMouseActive(true)
  }

  return (
    <div
      className={"h-screen grid place-content-center relative " + (isMouseActive ? "group" : "cursor-none")}
      style={{ backgroundColor: color }}
      onMouseMove={handleMouseMovement}
    >
      <h1
        className="font-bold text-2xl opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
      >
        One Color Page
      </h1>

      <Card className="absolute right-8 bottom-8 p-8 space-y-4 dark opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
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
