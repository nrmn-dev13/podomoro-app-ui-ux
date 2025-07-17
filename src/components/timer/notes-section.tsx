'use client'

import { useNotesStore, type Note } from '@/store/notes-store'
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Stack,
  Collapse,
  Divider
} from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'

interface NotesSectionProps {
  expanded: boolean
  onAddNote: () => void
  onEditNote: (note: Note) => void
  onDeleteNote: (note: Note) => void
}

export function NotesSection({ 
  expanded, 
  onAddNote, 
  onEditNote, 
  onDeleteNote 
}: NotesSectionProps) {
  const { notes } = useNotesStore()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const EmptyNotesState = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        No notes yet. Start by creating your first note!
      </Typography>
      <Button
        variant="outlined"
        size="small"
        startIcon={<Add />}
        onClick={onAddNote}
      >
        Create Note
      </Button>
    </Box>
  )

  const NoteCard = ({ note }: { note: Note }) => (
    <Card
      variant="outlined"
      sx={{
        transition: 'all 0.2s',
        '&:hover': { boxShadow: 1, bgcolor: 'action.hover' },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              component="h3"
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                mb: 0.5,
              }}
            >
              {note.title}
            </Typography>
            
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 1 }}
            >
              {formatDate(note.updatedAt)}
            </Typography>
            
            {note.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontSize: '0.75rem',
                }}
              >
                {note.description}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ ml: 1, display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => onEditNote(note)}
              aria-label={`Edit ${note.title}`}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDeleteNote(note)}
              color="error"
              aria-label={`Delete ${note.title}`}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Collapse in={expanded} timeout={300}>
      <Card sx={{ mt: 0 }}>
        <Divider />
        <CardContent sx={{ pt: 3, position: 'relative' }}>
          <Box sx={{ backgroundColor: 'white' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" component="h2" color="text.primary" sx={{ flex: 1 }}>
                Your Notes
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<Add />}
                onClick={onAddNote}
              >
                New Note
              </Button>
            </Box>

            {/* Notes List */}
            {notes.length === 0 ? (
              <EmptyNotesState />
            ) : (
              <Box
                sx={{
                  maxHeight: 300,
                  overflow: 'auto',
                  '&::-webkit-scrollbar': { width: '6px' },
                  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '3px' },
                  '&::-webkit-scrollbar-thumb': { backgroundColor: '#c1c1c1', borderRadius: '3px' },
                }}
              >
                <Stack spacing={1.5}>
                  {notes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Collapse>
  )
}