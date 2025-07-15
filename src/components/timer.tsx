'use client'

import { useState } from 'react'
import { useTimer } from '@/hooks/use-timer'
import { useTimerStore } from '@/store/timer-store'
import { 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress, 
  IconButton,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack
} from '@mui/material'
import { 
  PlayArrow, 
  Pause, 
  Stop, 
  Refresh,
  Settings
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

  const { workDuration, setWorkDuration } = useTimerStore()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [tempDuration, setTempDuration] = useState(workDuration.toString())

  // Check if timer is in initial/stopped state (when settings should be available)
  const canShowSettings = !isRunning && !isPaused

  const handlePlayPause = () => {
    if (isRunning) {
      pauseTimer()
    } else {
      startTimer()
    }
  }

  const handleOpenSettings = () => {
    setTempDuration(workDuration.toString())
    setSettingsOpen(true)
  }

  const handleSaveSettings = () => {
    const duration = parseInt(tempDuration)
    if (duration > 0 && duration <= 120) {
      setWorkDuration(duration)
      setSettingsOpen(false)
    }
  }

  const handleCancelSettings = () => {
    setTempDuration(workDuration.toString())
    setSettingsOpen(false)
  }

  // Preset times
  const presetTimes = [15, 25, 30, 45, 60]

  return (
    <>
      <Card sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          {/* Timer Display */}
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

            {/* Settings Button - Only show when timer is stopped */}
            {canShowSettings && (
              <IconButton
                onClick={handleOpenSettings}
                size="large"
                color="secondary"
                sx={{ width: 60, height: 60 }}
              >
                <Settings />
              </IconButton>
            )}
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
            {canShowSettings && (
              <Typography variant="caption" color="text.secondary" display="block">
                Click settings icon to customize timer duration
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onClose={handleCancelSettings} maxWidth="sm" fullWidth>
        <DialogTitle>Set Timer Duration</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Choose your preferred timer duration in minutes.
          </Typography>

          {/* Preset Buttons */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Quick Select (minutes)
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {presetTimes.map((time) => (
                <Chip
                  key={time}
                  label={`${time}m`}
                  variant={tempDuration === time.toString() ? "filled" : "outlined"}
                  color={tempDuration === time.toString() ? "primary" : "default"}
                  onClick={() => setTempDuration(time.toString())}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>
          </Box>

          {/* Custom Input */}
          <TextField
            label="Custom Duration (minutes)"
            type="number"
            fullWidth
            value={tempDuration}
            onChange={(e) => setTempDuration(e.target.value)}
            inputProps={{ min: 1, max: 120 }}
            helperText="Range: 1-120 minutes"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelSettings}>Cancel</Button>
          <Button 
            onClick={handleSaveSettings}
            variant="contained"
            disabled={!tempDuration || parseInt(tempDuration) < 1 || parseInt(tempDuration) > 120}
          >
            Set Timer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}