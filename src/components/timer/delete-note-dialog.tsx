'use client'

import { useNotesStore, type Note } from '@/store/notes-store'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button
} from '@mui/material'

interface DeleteNoteDialogProps {
  noteToDelete: Note | null
  onClose: () => void
}

export function DeleteNoteDialog({ noteToDelete, onClose }: DeleteNoteDialogProps) {
  const { deleteNote } = useNotesStore()

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete.id)
      onClose()
    }
  }

  return (
    <Dialog
      open={!!noteToDelete}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Are you sure?</DialogTitle>
      
      <DialogContent>
        <DialogContentText>
          This action cannot be undone. This will permanently delete the note
          "{noteToDelete?.title}".
        </DialogContentText>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleConfirmDelete} 
          color="error" 
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}