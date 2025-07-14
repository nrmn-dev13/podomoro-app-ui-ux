'use client'

import { useState } from 'react'
import { useNotesStore, type Note } from '@/store/notes-store'
import { NoteDialog } from './note-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Edit, Trash2, Plus } from 'lucide-react'

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
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Notes</h2>
        <NoteDialog>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Note
          </Button>
        </NoteDialog>
      </div>

      {notes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No notes yet</p>
            <NoteDialog>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Create your first note
              </Button>
            </NoteDialog>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {notes.map((note) => (
              <Card key={note.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">
                        {note.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {formatDate(note.updatedAt)}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(note)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(note)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {note.description && (
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {note.description}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Edit Dialog - FIXED: Now uses controlled mode */}
      {editingNote && (
        <NoteDialog
          note={editingNote}
          open={!!editingNote}
          onClose={() => setEditingNote(null)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!noteToDelete} onOpenChange={() => setNoteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the note 
              "{noteToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setNoteToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}