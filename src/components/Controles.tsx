import { Button } from "./ui/button";


interface ControlesProps {
  onStart: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export default function Controles({ onStart, onReset, isRunning }: ControlesProps) {
  return (
    <div className="flex gap-4">
      <Button
        variant="default"
        size="lg"
        onClick={onStart}>
        {isRunning ? 'stop' : 'start'}
      </Button>
      <Button variant="secondary" size="lg">Reset</Button>
    </div>
  )
}
