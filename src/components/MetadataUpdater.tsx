
import { useEffect } from "react";

interface MetadataUpdaterProps {
  minutes: number;
  seconds: number;
  mode: 'work' | 'break';
}

//this componet can change the tab title (Metadata)
export default function MetadataUpdater({ minutes, seconds, mode }: MetadataUpdaterProps) {
  useEffect(() => {
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    const modeString = mode === 'work' ? 'work' : 'break';
    document.title = `(${timeString}) ${modeString} -Ai Pomodoro Timer`;
  }, [minutes, seconds, mode])

  return null;
}
