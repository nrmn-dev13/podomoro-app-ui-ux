'use client'

import { Timer } from '@/components/timer'
import { 
  Container, 
  Typography, 
  Box
} from '@mui/material'

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

        {/* All-in-One Timer Component */}
        <Timer />
      </Container>
    </Box>
  )
}