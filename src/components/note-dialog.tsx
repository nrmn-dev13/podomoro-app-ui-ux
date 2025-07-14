'use client'

import { useState, useEffect } from 'react'
import { useNotesStore, type Note } from '@/store/notes-store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

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

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen !== undefined) {
      if (!newOpen) {
        onClose?.()
      }
    } else {
      setInternalOpen(newOpen)
      if (newOpen && !note) {
        setTitle('')
        setDescription('')
      }
    }
  }

  // If controlled mode (edit), don't use DialogTrigger
  if (controlledOpen !== undefined) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Note' : 'Add New Note'}
            </DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? 'Update your note details below.'
                : 'Create a new note to track your thoughts and tasks.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                {title.length}/100 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter note description..."
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                {description.length}/500 characters
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!title.trim()}
            >
              {isEditMode ? 'Update Note' : 'Add Note'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Default mode with DialogTrigger (for add)
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Note' : 'Add New Note'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? 'Update your note details below.'
              : 'Create a new note to track your thoughts and tasks.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              {title.length}/100 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter note description..."
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/500 characters
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!title.trim()}
          >
            {isEditMode ? 'Update Note' : 'Add Note'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}