export type NoteType = 'math' | 'text';

export interface NoteData {
  id: string;
  date: string; // ISO string format
  type: NoteType;
  content: string;
  lastModified: string; // ISO string format
}

export interface CalendarState {
  currentDate: Date;
  selectedDate: Date;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
}

export interface NotesState {
  notes: Record<string, NoteData[]>;
  activeNoteType: NoteType;
  addNote: (date: string, type: NoteType, content: string) => string;
  updateNote: (date: string, id: string, content: string) => void;
  deleteNote: (date: string, id: string) => void;
  setActiveNoteType: (type: NoteType) => void;
  getNotesByDate: (date: string) => NoteData[];
  resetAllData: () => void;
}