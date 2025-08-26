'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "./ui/switch";
import TimerDisplay from "./TimerDisplay";
import Controles from "./Controles";
import MetadataUpdater from "./MetadataUpdater";
import { useState, useEffect } from "react";
import { playNotificationSound } from "@/utils/sound";
import { useReward } from "react-rewards";
//タイマーのモードを表す型
type Mode = 'work' | 'break';

export default function TimerApp() {
  const { reward: confetti } = useReward('confettiReward', 'confetti', {
    elementCount: 100,
    spread: 70,
    decay: 0.93,
    lifetime: 150,
  })
  //this list can manage wheter the timer is runnning or not
  const [isRunning, setIsRunning] = useState(false);

  //working time and break time management
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);


  const [autoStart, setAutoStart] = useState(false);
  //reverse the boolean 
  const handleStart = () => {
    setIsRunning(!isRunning);
  }

  //this content can hold moving time 
  const [timeLeft, setTimeLeft] = useState({ minutes: 25, seconds: 0 });


  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft({
      minutes: mode === 'work' ? workDuration : breakDuration,
      seconds: 0
    })
  };
  const [mode, setMode] = useState<Mode>('work');

  //this function helps mode switch
  const toggleMode = () => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);

    setTimeLeft({
      minutes: newMode === 'work' ? workDuration : breakDuration,
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
              if (mode === 'work') {

                void confetti();//effect on
              }
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
      <span id="confettiReward" className="
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        "/>
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
          <CardFooter>
            {/* 作業時間の指定*/}
            <div className="flex items-center flex-col mx-auto">
              <div className="flex items-center gap-2 mx-auto justify-evenly ">
                <label className="text-sm font-medium min-w-[4.5rem]">working time</label>
                <select value={workDuration} onChange={(e) => {
                  const newDuration = parseInt(e.target.value);
                  setWorkDuration(newDuration)
                  if (mode === 'work' && isRunning) {
                    setTimeLeft({ minutes: newDuration, seconds: 0 })
                    console.log('mode is work');
                  }

                }}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500"
                >
                  {[5, 10, 15, 25, 30, 45, 60].map((minutes) => (
                    <option key={minutes} value={minutes}>{minutes}min</option>
                  ))}
                </select>
              </div>

              {/* define user break time */}
              <div className="gap-2 justify-evenly items-center mx-auto">
                <label className="text-sm font-medium min-w-[4.5rem] gap-2">break time</label>
                <select value={breakDuration} onChange={(e) => {
                  const newDuration = parseInt(e.target.value);
                  setBreakDuration(newDuration)
                  if (mode === 'break' && isRunning) {
                    setTimeLeft({ minutes: newDuration, seconds: 0 })
                    console.log('mode is break');
                  }
                }}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500"
                >
                  {[5, 10, 15].map((minutes) => (
                    <option key={minutes} value={minutes}>{minutes}min</option>
                  ))}
                </select>
              </div>

              <div className="gap-2 justify-evenly items-center mx-auto">
                <label className="text-sm font-medium min-w-[4.5rem] gap-2">Auto Start</label>
                <Switch />
              </div>
            </div>

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
