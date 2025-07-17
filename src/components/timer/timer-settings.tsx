'use client'

import { useState, useEffect } from 'react'
import { useTimerStore } from '@/store/timer-store'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Chip,
  Stack
} from '@mui/material'

interface TimerSettingsProps {
  open: boolean
  onClose: () => void
}

export function TimerSettings({ open, onClose }: TimerSettingsProps) {
  const { workDuration, setWorkDuration } = useTimerStore()
  const [tempDuration, setTempDuration] = useState(workDuration.toString())

  const presetTimes = [15, 25, 30, 45, 60]

  // Reset temp duration when dialog opens
  useEffect(() => {
    if (open) {
      setTempDuration(workDuration.toString())
    }
  }, [open, workDuration])

  const handleSave = () => {
    const duration = parseInt(tempDuration)
    if (duration > 0 && duration <= 120) {
      setWorkDuration(duration)
      onClose()
    }
  }

  const handleCancel = () => {
    setTempDuration(workDuration.toString())
    onClose()
  }

  const isValidDuration = () => {
    const duration = parseInt(tempDuration)
    return tempDuration && duration >= 1 && duration <= 120
  }

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Set Timer Duration</DialogTitle>
      
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Choose your preferred timer duration in minutes.
        </Typography>

        {/* Preset Times */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Quick Select (minutes)
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {presetTimes.map((time) => (
              <Chip
                key={time}
                label={`${time}m`}
                variant={tempDuration === time.toString() ? 'filled' : 'outlined'}
                color={tempDuration === time.toString() ? 'primary' : 'default'}
                onClick={() => setTempDuration(time.toString())}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Box>

        {/* Custom Duration Input */}
        <TextField
          label="Custom Duration (minutes)"
          type="number"
          fullWidth
          value={tempDuration}
          onChange={(e) => setTempDuration(e.target.value)}
          inputProps={{ min: 1, max: 120 }}
          helperText="Range: 1-120 minutes"
          error={tempDuration !== '' && !isValidDuration()}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isValidDuration()}
        >
          Set Timer
        </Button>
      </DialogActions>
    </Dialog>
  )
}