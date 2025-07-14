'use client'

import { useTimer } from '@/hooks/use-timer'
import { 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress, 
  IconButton,
  Box,
  Chip
} from '@mui/material'
import { 
  PlayArrow, 
  Pause, 
  Stop, 
  Refresh 
} from '@mui/icons-material'

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
    <Card sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <CardContent sx={{ textAlign: 'center', p: 4 }}>
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontFamily: 'monospace',
            fontSize: '4rem',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            mb: 3
          }}
        >
          {formatTime(timeRemaining)}
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress 
            variant="determinate" 
            value={getProgress()} 
            sx={{ height: 8, borderRadius: 4, mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {Math.round(getProgress())}% complete
          </Typography>
        </Box>

        {/* Control Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
          <IconButton
            onClick={handlePlayPause}
            size="large"
            color="primary"
            sx={{ 
              width: 60, 
              height: 60,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            {isRunning ? <Pause /> : <PlayArrow />}
          </IconButton>
          
          <IconButton
            onClick={stopTimer}
            size="large"
            sx={{ width: 60, height: 60 }}
          >
            <Stop />
          </IconButton>
          
          <IconButton
            onClick={resetTimer}
            size="large"
            sx={{ width: 60, height: 60 }}
          >
            <Refresh />
          </IconButton>
        </Box>

        {/* Status Info */}
        <Box>
          {isPaused && (
            <Chip 
              label="Timer Paused" 
              color="warning" 
              sx={{ mb: 1 }}
            />
          )}
          {timeRemaining === 0 && (
            <Chip 
              label="Timer Complete! 🎉" 
              color="success" 
              sx={{ mb: 1 }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}