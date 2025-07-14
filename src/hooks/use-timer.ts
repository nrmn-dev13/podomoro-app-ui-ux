import { useEffect } from 'react'
import { useTimerStore } from '@/store/timer-store'

export function useTimer() {
  const {
    timeRemaining,
    isRunning,
    isPaused,
    workDuration,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer,
    tick
  } = useTimerStore()

  // Effect untuk countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        tick()
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeRemaining, tick])

  // Helper function untuk format waktu
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Helper function untuk progress percentage
  const getProgress = () => {
    const totalTime = workDuration * 60
    return ((totalTime - timeRemaining) / totalTime) * 100
  }

  return {
    timeRemaining,
    isRunning,
    isPaused,
    formatTime,
    getProgress,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer
  }
}