'use client'

import { Timer } from '@/components/timer'
import { SetTimerDialog } from '@/components/set-timer-dialog'
import { NotesList } from '@/components/notes-list'
import { Button } from '@/components/ui/button'
//import { Separator } from '@/components/ui/separator'
import { useTimerStore } from '@/store/timer-store'
import { Settings } from 'lucide-react'

function SetTimerButton() {
  const { isRunning, isPaused } = useTimerStore()
  const isInitialOrStopped = !isRunning && !isPaused

  if (!isInitialOrStopped) return null

  return (
    <SetTimerDialog>
      <Button variant="outline" size="lg" className="gap-2">
        <Settings className="h-4 w-4" />
        Set Timer
      </Button>
    </SetTimerDialog>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Pomodoro Timer
          </h1>
          <p className="text-gray-600">
            Boost your productivity with the Pomodoro Technique
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center space-y-6">
            <Timer />
            <SetTimerButton />
          </div>

          <div className="lg:sticky lg:top-8">
            <NotesList />
          </div>
        </div>
      </div>
    </main>
  )
}