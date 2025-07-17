'use client'

import { useTimer } from '@/hooks/use-timer'
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  IconButton,
  Box,
  Chip,
  Button
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  Stop,
  Refresh,
  Settings,
  KeyboardArrowDown,
  KeyboardArrowUp,
  NoteAdd,
} from '@mui/icons-material'

interface TimerDisplayProps {
  notesExpanded: boolean
  notesCount: number
  onToggleNotes: () => void
  onOpenSettings: () => void
}

export function TimerDisplay({ 
  notesExpanded, 
  notesCount, 
  onToggleNotes, 
  onOpenSettings 
}: TimerDisplayProps) {
  const {
    timeRemaining,
    isRunning,
    isPaused,
    formatTime,
    getProgress,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer,
  } = useTimer()

  const handlePlayPause = () => {
    if (isRunning) {
      pauseTimer()
    } else {
      startTimer()
    }
  }

  const getCurrentDate = () => {
    const today = new Date()
    return today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Card>
      {/* Decorative Elements */}
      <div className="top-button"></div>
      <div className={`bottom-button${notesExpanded ? ' expanded' : ''}`}></div>
      <div className="button-wrapper">
        <div className="top-button-sm"></div>
        <div className="top-button-sm"></div>
      </div>

      <CardContent
        sx={{
          textAlign: 'center',
          p: 4,
          backgroundColor: '#d9d9d9',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Screen Display */}
        <div className="screen">
          <span className="shine-lg"></span>
          <span className="shine-sm"></span>
          
          {/* Date Display */}
          <Typography
            variant="h1"
            component="div"
            sx={{
              fontFamily: 'monospace',
              fontSize: { xs: '1rem', sm: '1rem' },
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              mb: 3,
              zIndex: 1,
              position: 'relative',
            }}
          >
            {getCurrentDate()}
          </Typography>

          {/* Timer Display */}
          <Typography
            variant="h1"
            component="div"
            sx={{
              fontFamily: 'monospace',
              fontSize: { xs: '3rem', sm: '4rem' },
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              mb: 3,
              zIndex: 1,
              position: 'relative',
            }}
          >
            {formatTime(timeRemaining)}
          </Typography>

          {/* Progress Bar */}
          <Box>
            <LinearProgress
              variant="determinate"
              value={getProgress()}
              sx={{ height: 8, borderRadius: 4, mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {Math.round(getProgress())}% complete
            </Typography>
          </Box>
        </div>

        {/* Control Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, mb: 3 }}>
          <IconButton
            onClick={handlePlayPause}
            size="large"
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'success.main',
              color: 'white',
              '&:hover': { bgcolor: 'success.light' },
            }}
          >
            {isRunning ? <Pause /> : <PlayArrow />}
          </IconButton>

          <IconButton
            onClick={stopTimer}
            size="large"
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': { bgcolor: 'error.light' },
            }}
          >
            <Stop />
          </IconButton>

          <IconButton
            onClick={resetTimer}
            size="large"
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'warning.main',
              color: 'white',
              '&:hover': { bgcolor: 'warning.light' },
            }}
          >
            <Refresh />
          </IconButton>
        </Box>

        {/* Status and Action Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          {/* Status Chips */}
          {isPaused && (
            <Chip label="Timer Paused" color="warning" sx={{ mb: 1 }} />
          )}
          {timeRemaining === 0 && (
            <Chip label="Timer Complete! 🎉" color="success" sx={{ mb: 1 }} />
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<Settings />}
              onClick={onOpenSettings}
              sx={{ minWidth: 140 }}
            >
              Set Timer
            </Button>
            
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<NoteAdd />}
              endIcon={notesExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              onClick={onToggleNotes}
              sx={{ minWidth: 140 }}
            >
              Notes
              {notesCount > 0 && ` (${notesCount})`}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}