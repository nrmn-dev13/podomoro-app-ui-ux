import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Note {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

interface NotesState {
  notes: Note[]
  addNote: (title: string, description: string) => void
  updateNote: (id: string, title: string, description: string) => void
  deleteNote: (id: string) => void
  getNoteById: (id: string) => Note | undefined
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      
      addNote: (title: string, description: string) => {
        const newNote: Note = {
          id: crypto.randomUUID(),
          title,
          description,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        set((state) => ({
          notes: [newNote, ...state.notes]
        }))
      },
      
      updateNote: (id: string, title: string, description: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, title, description, updatedAt: new Date() }
              : note
          )
        }))
      },
      
      deleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id)
        }))
      },
      
      getNoteById: (id: string) => {
        return get().notes.find((note) => note.id === id)
      }
    }),
    {
      name: 'pomodoro-notes-storage',
      storage: {
        getItem: (name: string) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          
          const parsed = JSON.parse(str)
          // Convert date strings back to Date objects
          if (parsed.state?.notes) {
            parsed.state.notes = parsed.state.notes.map((note: any) => ({
              ...note,
              createdAt: new Date(note.createdAt),
              updatedAt: new Date(note.updatedAt)
            }))
          }
          return parsed
        },
        setItem: (name: string, value: any) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name)
        }
      }
    }
  )
)