'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TimerDisplay from "./TimerDisplay";
import Controles from "./Controles";
import { useState } from "react";


export default function TimerApp() {
  //this list can manage wheter the timer is runnning or not
  const [isRunning, setIsRunning] = useState(false);

  //reverse the boolean 
  const handleStart = () => {
    setIsRunning(!isRunning);
  }


  const handleReset = () => {
    setIsRunning(false);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Working Time
          </CardTitle>
          <CardContent className="flex flex-col items-center gap-6">
            <TimerDisplay
              minutes={25}
              seconds={0} />
            <Controles
              onStart={handleStart}
              onReset={handleReset}
              isRunning={isRunning}
            />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
