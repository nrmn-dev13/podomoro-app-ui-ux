'use client'

import { useTimer } from '@/hooks/use-timer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, Square, RotateCcw } from 'lucide-react'

export function Timer() {
  const {
    timeRemaining,
    isRunning,
    isPaused,
    formatTime,
    getProgress,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer
  } = useTimer()

  const handlePlayPause = () => {
    if (isRunning) {
      pauseTimer()
    } else {
      startTimer()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-6xl font-mono font-bold tracking-wider">
          {formatTime(timeRemaining)}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={getProgress()} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            {Math.round(getProgress())}% complete
          </p>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-2">
          <Button
            onClick={handlePlayPause}
            size="lg"
            className="w-20"
          >
            {isRunning ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          
          <Button
            onClick={stopTimer}
            variant="outline"
            size="lg"
            className="w-20"
          >
            <Square className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={resetTimer}
            variant="outline"
            size="lg"
            className="w-20"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        {/* Status Info */}
        <div className="text-center space-y-2">
          {isPaused && (
            <p className="text-sm text-yellow-600 font-medium">
              Timer Paused
            </p>
          )}
          {timeRemaining === 0 && (
            <p className="text-sm text-green-600 font-medium">
              Timer Complete! 🎉
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}