interface TotalTimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
}




export default function TotalTimerDisplay({ minutes, seconds, hours }: TotalTimerDisplayProps) {
  return (
    <div className={`text-3xl font-mono font-bold items-center`}>
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}
