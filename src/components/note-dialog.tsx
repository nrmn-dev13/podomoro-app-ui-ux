'use client'

import { useState, useEffect } from 'react'
import { useNotesStore, type Note } from '@/store/notes-store'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography
} from '@mui/material'

interface NoteDialogProps {
  children?: React.ReactNode
  note?: Note
  open?: boolean
  onClose?: () => void
}

export function NoteDialog({ children, note, open: controlledOpen, onClose }: NoteDialogProps) {
  const { addNote, updateNote } = useNotesStore()
  const [internalOpen, setInternalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const isEditMode = !!note
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setDescription(note.description)
    } else {
      setTitle('')
      setDescription('')
    }
  }, [note])

  const handleSave = () => {
    if (!title.trim()) return

    if (isEditMode && note) {
      updateNote(note.id, title.trim(), description.trim())
    } else {
      addNote(title.trim(), description.trim())
    }

    handleClose()
  }

  const handleClose = () => {
    if (controlledOpen !== undefined) {
      onClose?.()
    } else {
      setInternalOpen(false)
    }
    setTitle('')
    setDescription('')
  }

  const handleOpen = () => {
    if (controlledOpen === undefined) {
      setInternalOpen(true)
      if (!note) {
        setTitle('')
        setDescription('')
      }
    }
  }

  // If controlled mode (edit), don't need click handler
  if (controlledOpen !== undefined) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditMode ? 'Edit Note' : 'Add New Note'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {isEditMode 
              ? 'Update your note details below.'
              : 'Create a new note to track your thoughts and tasks.'
            }
          </Typography>

          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{ maxLength: 100 }}
            helperText={`${title.length}/100 characters`}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 500 }}
            helperText={`${description.length}/500 characters`}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSave}
            variant="contained"
            disabled={!title.trim()}
          >
            {isEditMode ? 'Update Note' : 'Add Note'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  // Default mode with click trigger (for add)
  return (
    <>
      <Box onClick={handleOpen}>
        {children}
      </Box>
      
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditMode ? 'Edit Note' : 'Add New Note'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {isEditMode 
              ? 'Update your note details below.'
              : 'Create a new note to track your thoughts and tasks.'
            }
          </Typography>

          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{ maxLength: 100 }}
            helperText={`${title.length}/100 characters`}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 500 }}
            helperText={`${description.length}/500 characters`}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSave}
            variant="contained"
            disabled={!title.trim()}
          >
            {isEditMode ? 'Update Note' : 'Add Note'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}