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
  Typography
} from '@mui/material'

interface NoteDialogProps {
  open: boolean
  editingNote: Note | null
  onClose: () => void
}

export function NoteDialog({ open, editingNote, onClose }: NoteDialogProps) {
  const { addNote, updateNote } = useNotesStore()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const isEditMode = !!editingNote
  const maxTitleLength = 100
  const maxDescriptionLength = 500

  // Update form when editing note changes
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)
      setDescription(editingNote.description)
    } else {
      setTitle('')
      setDescription('')
    }
  }, [editingNote])

  const handleSave = () => {
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle) return

    if (isEditMode && editingNote) {
      updateNote(editingNote.id, trimmedTitle, trimmedDescription)
    } else {
      addNote(trimmedTitle, trimmedDescription)
    }

    handleClose()
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    onClose()
  }

  const isTitleValid = () => {
    return title.trim().length > 0 && title.length <= maxTitleLength
  }

  const isDescriptionValid = () => {
    return description.length <= maxDescriptionLength
  }

  const canSave = () => {
    return isTitleValid() && isDescriptionValid()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditMode ? 'Edit Note' : 'Add New Note'}
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {isEditMode
            ? 'Update your note details below.'
            : 'Create a new note to track your thoughts and tasks.'}
        </Typography>

        <TextField
          label="Title"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: maxTitleLength }}
          helperText={`${title.length}/${maxTitleLength} characters`}
          error={title.length > 0 && !isTitleValid()}
          sx={{ mb: 2 }}
          autoFocus
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{ maxLength: maxDescriptionLength }}
          helperText={`${description.length}/${maxDescriptionLength} characters`}
          error={!isDescriptionValid()}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!canSave()}
        >
          {isEditMode ? 'Update Note' : 'Add Note'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}