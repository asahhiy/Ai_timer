import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, Timer } from "lucide-react"

interface ControlesProps {
  onStart: () => void;
  onReset: () => void;
  onModetoggle: () => void;
  isRunning: boolean;
}

export default function Controles({ onStart, onReset, onModetoggle, isRunning }: ControlesProps) {
  return (
    <div className="flex gap-4 items-center flex-col">
      <Button
        variant="default"
        size="lg"
        onClick={onStart}
        className={`w-full max-w-xs duration-300  cursor-pointer ${isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
          }`}>
        <span className="flex items-center gap-2 font-bold">
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isRunning ? 'stop' : 'start'}
        </span>


      </Button>
      <div className="flex gap-3 w-full max-w-xs">
        <Button
          variant="secondary"
          size="lg"
          onClick={onReset}
          className="felx-1/2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
            Reset
          </span>
        </Button>
        <Button
          variant="secondary"
          onClick={onModetoggle}
          className="flex-1/2 group bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Timer className="w-4 h-4 group-hover:scale-110 transition-form duration-200" />
            change the mode
          </span>

        </Button>
      </div>

    </div >
  )
}
