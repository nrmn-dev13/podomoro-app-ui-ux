import { create } from 'zustand'

export interface TimerState {
  // Timer state
  timeRemaining: number // dalam detik
  isRunning: boolean
  isPaused: boolean
  
  // Settings
  workDuration: number // dalam menit
  
  // Actions
  startTimer: () => void
  pauseTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
  setWorkDuration: (minutes: number) => void
  tick: () => void
}

export const useTimerStore = create<TimerState>((set, get) => ({
  // Initial state
  timeRemaining: 25 * 60, // 25 menit dalam detik
  isRunning: false,
  isPaused: false,
  
  // Default duration (dalam menit)
  workDuration: 25,
  
  // Actions
  startTimer: () => {
    set({ isRunning: true, isPaused: false })
  },
  
  pauseTimer: () => {
    set({ isRunning: false, isPaused: true })
  },
  
  stopTimer: () => {
    const { workDuration } = get()
    set({ 
      isRunning: false, 
      isPaused: false,
      timeRemaining: workDuration * 60
    })
  },
  
  resetTimer: () => {
    const { workDuration } = get()
    set({ 
      timeRemaining: workDuration * 60,
      isRunning: false,
      isPaused: false
    })
  },
  
  setWorkDuration: (minutes: number) => {
    set({ 
      workDuration: minutes,
      timeRemaining: minutes * 60
    })
  },
  
  tick: () => {
    const state = get()
    if (state.isRunning && state.timeRemaining > 0) {
      set({ timeRemaining: state.timeRemaining - 1 })
    } else if (state.timeRemaining === 0) {
      // Timer selesai
      set({ isRunning: false })
    }
  }
}))