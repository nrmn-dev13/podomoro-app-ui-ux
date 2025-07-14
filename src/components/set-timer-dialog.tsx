'use client'

import { useState } from 'react'
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
import { Settings } from '@mui/icons-material'

interface SetTimerDialogProps {
  children: React.ReactNode
}

export function SetTimerDialog({ children }: SetTimerDialogProps) {
  const { workDuration, setWorkDuration } = useTimerStore()
  const [tempDuration, setTempDuration] = useState(workDuration.toString())
  const [open, setOpen] = useState(false)

  const handleSave = () => {
    const duration = parseInt(tempDuration)
    if (duration > 0 && duration <= 120) {
      setWorkDuration(duration)
      setOpen(false)
    }
  }

  const handleCancel = () => {
    setTempDuration(workDuration.toString())
    setOpen(false)
  }

  const handleOpen = () => {
    setTempDuration(workDuration.toString())
    setOpen(true)
  }

  // Preset times
  const presetTimes = [15, 25, 30, 45, 60]

  return (
    <>
      <Box onClick={handleOpen}>
        {children}
      </Box>
      
      <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
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
            helperText={`${tempDuration?.length || 0} - Range: 1-120 minutes`}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button 
            onClick={handleSave}
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