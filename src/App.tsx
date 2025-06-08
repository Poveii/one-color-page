import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { MonitorStop } from "lucide-react"
import useStayAwake from "use-stay-awake"

import {
  Card,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

type MouseMoveType = MouseEvent<HTMLDivElement> & { target: Element }

interface AppProps {
  screenAwake?: boolean
}

function App({ screenAwake = false }: AppProps) {
  const { color: colorParam } = useParams()
  const navigate = useNavigate()

  const [color, setColor] = useState(colorParam ? '#' + colorParam : "#FFFFFF")
  const [mouseActive, setMouseActive] = useState(false)
  const [stayScreenAwake, setStayScreenAwake] = useState(screenAwake)

  const device = useStayAwake()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
    setStayScreenAwake(true)
    navigate(`/${color.substring(1)}`)
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

  function handleSwitchScreenAwake() {
    setStayScreenAwake(!stayScreenAwake)
  }

  useEffect(() => {
    if (stayScreenAwake === true) {
      device.preventSleeping()
    } else {
      device.allowSleeping()
    }
  }, [device, stayScreenAwake])

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

      <Card className={"absolute right-8 bottom-8 p-8 gap-4 opacity-0 invisible transition-all bg-blue-950" + (mouseActive ? " group-hover:opacity-100 group-hover:visible" : " !visible !opacity-100")}>
        <CardTitle className="text-white">Escolha uma cor</CardTitle>
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

      <div
        className={
          "absolute top-8 right-4 p-4 flex gap-4 invisible opacity-0" +
          (
            mouseActive
            ? " group-hover:opacity-100 group-hover:visible"
            : " !visible !opacity-100"
          )
        }
      >
        <div className="flex flex-col items-center gap-1 p-4 bg-zinc-600 rounded-lg cursor-pointer" onClick={handleSwitchScreenAwake}>
          <MonitorStop size={28} className="text-white" />

          <p className="text-white text-sm font-medium">
            {stayScreenAwake ? "Ativado" : "Desativado"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
