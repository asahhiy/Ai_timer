'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TimerDisplay from "./TimerDisplay";
import Controles from "./Controles";
import { useState, useEffect } from "react";

//タイマーのモードを表す型
type Mode = 'work' | 'break';



export default function TimerApp() {
  //this list can manage wheter the timer is runnning or not
  const [isRunning, setIsRunning] = useState(false);

  //reverse the boolean 
  const handleStart = () => {
    setIsRunning(!isRunning);
  }

  //this content can hold moving time 
  const [timeLeft, setTimeLeft] = useState({ minutes: 25, seconds: 0 });


  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft({
      minutes: mode === 'work' ? 25 : 5,
      seconds: 0
    })
  };
  const [mode, setMode] = useState<Mode>('work');

  //this function helps mode switch
  const toggleMode = () => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);

    setTimeLeft({
      minutes: newMode === 'work' ? 25 : 5,
      seconds: 0,
    })

    setIsRunning(false);
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          //if seconds is 0, next seconds change 59s
          if (prev.seconds === 0) {

            //if min is0, timer will be stopped
            if (prev.minutes === 0) {
              setIsRunning(false); //timer will stop
              return prev;
            }
            //if timer is still runnning
            return { minutes: prev.minutes - 1, seconds: 59 }
          }
          return { ...prev, seconds: prev.seconds - 1 };
        })
      }, 1000);
    }

    //cleanup関数
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

  }, [isRunning]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {mode === 'work' ? 'Working Time' : 'Break Time'}
          </CardTitle>
          <CardContent className="flex flex-col items-center gap-6">
            <TimerDisplay
              minutes={timeLeft.minutes}
              seconds={timeLeft.seconds} />
            <Controles
              onStart={handleStart}
              onReset={handleReset}
              onModetoggle={toggleMode}
              isRunning={isRunning}
            />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
