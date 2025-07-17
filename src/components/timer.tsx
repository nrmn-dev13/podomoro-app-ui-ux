'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { TimerDisplay } from './timer/timer-display'
import { TimerSettings } from './timer/timer-settings'
import { NotesSection } from './timer/notes-section'
import { NoteDialog } from './timer/note-dialog'
import { DeleteNoteDialog } from './timer/delete-note-dialog'
import { useNotesStore, type Note } from '@/store/notes-store'

export function Timer() {
  const { notes } = useNotesStore()
  
  // UI State
  const [notesExpanded, setNotesExpanded] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  // Note Dialog State
  const [noteDialogOpen, setNoteDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null)

  // Event Handlers
  const handleToggleNotes = () => {
    setNotesExpanded(!notesExpanded)
  }

  const handleOpenSettings = () => {
    setSettingsOpen(true)
  }

  const handleCloseSettings = () => {
    setSettingsOpen(false)
  }

  const handleOpenNoteDialog = (note?: Note) => {
    setEditingNote(note || null)
    setNoteDialogOpen(true)
    
    // Auto-expand notes when adding/editing
    if (!notesExpanded) {
      setNotesExpanded(true)
    }
  }

  const handleCloseNoteDialog = () => {
    setNoteDialogOpen(false)
    setEditingNote(null)
  }

  const handleDeleteNote = (note: Note) => {
    setNoteToDelete(note)
  }

  const handleCloseDeleteDialog = () => {
    setNoteToDelete(null)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', position: 'relative' }}>
      {/* Main Timer Display */}
      <TimerDisplay
        notesExpanded={notesExpanded}
        notesCount={notes.length}
        onToggleNotes={handleToggleNotes}
        onOpenSettings={handleOpenSettings}
      />

      {/* Collapsible Notes Section */}
      <NotesSection
        expanded={notesExpanded}
        onAddNote={() => handleOpenNoteDialog()}
        onEditNote={handleOpenNoteDialog}
        onDeleteNote={handleDeleteNote}
      />

      {/* Dialogs */}
      <TimerSettings
        open={settingsOpen}
        onClose={handleCloseSettings}
      />

      <NoteDialog
        open={noteDialogOpen}
        editingNote={editingNote}
        onClose={handleCloseNoteDialog}
      />

      <DeleteNoteDialog
        noteToDelete={noteToDelete}
        onClose={handleCloseDeleteDialog}
      />
    </Box>
  )
}