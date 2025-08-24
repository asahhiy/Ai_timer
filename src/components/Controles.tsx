import { Button } from "./ui/button";


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
        onClick={onStart}>
        {isRunning ? 'stop' : 'start'}
      </Button>
      <Button
        variant="secondary"
        size="lg"
        onClick={onReset}
      >Reset</Button>
      <Button
        variant="ghost"
        onClick={onModetoggle}
        className="text-muted-foreground hover:text-foreground"
      >change the mode</Button>
    </div>
  )
}
