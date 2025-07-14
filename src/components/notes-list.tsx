'use client'

import { useState } from 'react'
import { useNotesStore, type Note } from '@/store/notes-store'
import { NoteDialog } from './note-dialog'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Chip,
  Stack
} from '@mui/material'
import { Edit, Delete, Add } from '@mui/icons-material'

export function NotesList() {
  const { notes, deleteNote } = useNotesStore()
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const handleDelete = (note: Note) => {
    setNoteToDelete(note)
  }

  const confirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete.id)
      setNoteToDelete(null)
    }
  }

  const handleEdit = (note: Note) => {
    setEditingNote(note)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h2" component="h2" color="text.primary">
          Notes
        </Typography>
        <NoteDialog>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ gap: 1 }}
          >
            Add Note
          </Button>
        </NoteDialog>
      </Box>

      {notes.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              No notes yet
            </Typography>
            <NoteDialog>
              <Button
                variant="outlined"
                startIcon={<Add />}
                sx={{ gap: 1 }}
              >
                Create your first note
              </Button>
            </NoteDialog>
          </CardContent>
        </Card>
      ) : (
        <Box 
          sx={{ 
            height: 400, 
            overflow: 'auto', 
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c1c1c1',
              borderRadius: '4px',
            },
          }}
        >
          <Stack spacing={2}>
            {notes.map((note) => (
              <Card 
                key={note.id} 
                sx={{ 
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 4
                  }
                }}
              >
                <CardHeader
                  title={
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        pr: 1
                      }}
                    >
                      {note.title}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(note.updatedAt)}
                    </Typography>
                  }
                  action={
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(note)}
                        sx={{ mr: 0.5 }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(note)}
                        color="error"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                  sx={{ pb: note.description ? 1 : 2 }}
                />
                {note.description && (
                  <CardContent sx={{ pt: 0 }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {note.description}
                    </Typography>
                  </CardContent>
                )}
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {/* Edit Dialog */}
      {editingNote && (
        <NoteDialog
          note={editingNote}
          open={!!editingNote}
          onClose={() => setEditingNote(null)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!noteToDelete}
        onClose={() => setNoteToDelete(null)}
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
          <Button onClick={() => setNoteToDelete(null)}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}