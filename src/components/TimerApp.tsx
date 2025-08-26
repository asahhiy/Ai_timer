'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import TimerDisplay from "./TimerDisplay";
import Controles from "./Controles";
import MetadataUpdater from "./MetadataUpdater";
import { useState, useEffect } from "react";
import { playNotificationSound } from "@/utils/sound";
//タイマーのモードを表す型
type Mode = 'work' | 'break';



export default function TimerApp() {
  //this list can manage wheter the timer is runnning or not
  const [isRunning, setIsRunning] = useState(false);

  const [workDuration, setWorkDuration] = useState(25);

  //reverse the boolean 
  const handleStart = () => {
    setIsRunning(!isRunning);
  }

  //this content can hold moving time 
  const [timeLeft, setTimeLeft] = useState({ minutes: 25, seconds: 0 });


  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft({
      minutes: mode === 'work' ? workDuration : 5,
      seconds: 0
    })
  };
  const [mode, setMode] = useState<Mode>('work');

  //this function helps mode switch
  const toggleMode = () => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);

    setTimeLeft({
      minutes: newMode === 'work' ? workDuration : 5,
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
              toggleMode();
              void playNotificationSound();
              return prev;
            }
            //if timer is still runnning
            return { minutes: prev.minutes - 1, seconds: 59 }
          }
          return { ...prev, seconds: prev.seconds - 1 };
        })
      }, 1);
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
              seconds={timeLeft.seconds}
              mode={mode}
            />
            <Controles
              onStart={handleStart}
              onReset={handleReset}
              onModetoggle={toggleMode}
              isRunning={isRunning}
            />
          </CardContent>
          <CardFooter className="flex justify-center gap-2 items-center ">
            <label className="text-sm font-medium">working time</label>
            <select value={workDuration} onChange={(e) => {
              const newDuration = parseInt(e.target.value);
              setWorkDuration(newDuration)
              if (mode === 'work' && !isRunning) {
                setTimeLeft({ minutes: newDuration, seconds: 0 })
              }
              setTimeLeft({ minutes: newDuration, seconds: 0 });

            }}
            >
              {[5, 10, 15, 30, 45, 60].map((minutes) => (
                <option key={minutes} value={minutes}>{minutes}min</option>
              ))}
            </select>
          </CardFooter>
        </CardHeader>
      </Card >
      <MetadataUpdater
        minutes={timeLeft.minutes}
        seconds={timeLeft.seconds}
        mode={mode}

      />
    </div >
  )
}
