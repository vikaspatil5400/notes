import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NoteData, NoteType, NotesState } from '../types';

const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: {},
      activeNoteType: 'text',
      
      addNote: (date: string, type: NoteType, content: string) => {
        const id = crypto.randomUUID();
        const newNote: NoteData = {
          id,
          date,
          type,
          content,
          lastModified: new Date().toISOString(),
        };
        
        set((state) => {
          const existingNotes = state.notes[date] || [];
          return {
            notes: {
              ...state.notes,
              [date]: [...existingNotes, newNote],
            },
          };
        });
        
        return id;
      },
      
      updateNote: (date: string, id: string, content: string) => {
        set((state) => {
          const dateNotes = state.notes[date] || [];
          const updatedNotes = dateNotes.map((note) =>
            note.id === id
              ? { ...note, content, lastModified: new Date().toISOString() }
              : note
          );
          
          return {
            notes: {
              ...state.notes,
              [date]: updatedNotes,
            },
          };
        });
      },
      
      deleteNote: (date: string, id: string) => {
        set((state) => {
          const dateNotes = state.notes[date] || [];
          const filteredNotes = dateNotes.filter((note) => note.id !== id);
          
          const updatedNotes = { ...state.notes };
          if (filteredNotes.length === 0) {
            delete updatedNotes[date];
          } else {
            updatedNotes[date] = filteredNotes;
          }
          
          return {
            notes: updatedNotes,
          };
        });
      },
      
      setActiveNoteType: (type: NoteType) => set({ activeNoteType: type }),
      
      getNotesByDate: (date: string) => {
        const state = get();
        return state.notes[date] || [];
      },

      resetAllData: () => {
        set({ notes: {} });
      },
    }),
    {
      name: 'canvas-notepad-storage',
    }
  )
);

export default useNotesStore;