'use client'

import { Timer } from '@/components/timer'
import { SetTimerDialog } from '@/components/set-timer-dialog'
import { NotesList } from '@/components/notes-list'
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Paper
} from '@mui/material'
import { useTimerStore } from '@/store/timer-store'
import { Settings } from '@mui/icons-material'

function SetTimerButton() {
  const { isRunning, isPaused } = useTimerStore()
  const isInitialOrStopped = !isRunning && !isPaused

  if (!isInitialOrStopped) return null

  return (
    <SetTimerDialog>
      <Button
        variant="outlined"
        size="large"
        startIcon={<Settings />}
      >
        Set Timer
      </Button>
    </SetTimerDialog>
  )
}

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        py: 4
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 1
            }}
          >
            Pomodoro Timer
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            Boost your productivity with the Pomodoro Technique
          </Typography>
        </Box>

        {/* CSS Grid Solution - No TypeScript issues */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr',           // Mobile: 1 column
              lg: '1fr 1fr'        // Desktop: 2 columns
            },
            gap: 4,
            alignItems: 'start'
          }}
        >
          {/* Timer Section */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 3 
          }}>
            <Timer />
            <SetTimerButton />
          </Box>

          {/* Notes Section */}
          <Paper 
            elevation={2}
            sx={{ 
              p: 3,
              position: { lg: 'sticky' },
              top: { lg: 32 },
              borderRadius: 2
            }}
          >
            <NotesList />
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}