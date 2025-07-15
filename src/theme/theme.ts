'use client'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3b82f6', // Blue-500
      light: '#60a5fa', // Blue-400
      dark: '#2563eb', // Blue-600
    },
    secondary: {
      main: '#919191', // Indigo-500
      light: '#818cf8', // Indigo-400
      dark: '#a3a3a3', // Indigo-600
    },
    success: {
      main: '#97F7AC', // Indigo-500
      light: '#bcfcca', // Indigo-500
    },
    error: {
      main: '#FC908C', // Indigo-500
      light: '#ffbab7', // Indigo-500
    },
    warning: {
      main: '#f0c52c', // Indigo-500
      light: '#e7ce76', // Indigo-500
    },
    background: {
      default: '#f8fafc', // Slate-50
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate-900
      secondary: '#64748b', // Slate-500
    },
  },
  typography: {
    fontFamily: 'inherit',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
})