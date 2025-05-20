import React, { useState, useEffect, useRef } from 'react';
import useNotesStore from '../store/useNotesStore';
import useCalendarStore from '../store/useCalendarStore';
import { formatDate } from '../utils/dateUtils';

const NoteCanvas: React.FC = () => {
  const { selectedDate } = useCalendarStore();
  const { addNote, updateNote, getNotesByDate } = useNotesStore();
  const dateKey = formatDate(selectedDate);
  
  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState<string | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Load existing text note for the selected date
  useEffect(() => {
    const notes = getNotesByDate(dateKey);
    const textNote = notes.find(note => note.type === 'text');
    
    if (textNote) {
      setContent(textNote.content);
      setNoteId(textNote.id);
    } else {
      setContent('');
      setNoteId(null);
    }
    
    // Focus on textarea after load
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  }, [dateKey, getNotesByDate]);
  
  // Save note when content changes
  useEffect(() => {
    const saveNote = () => {
      if (content.trim()) {
        if (noteId) {
          updateNote(dateKey, noteId, content);
        } else {
          const id = addNote(dateKey, 'text', content);
          setNoteId(id);
        }
      }
    };
    
    const debounceTimeout = setTimeout(saveNote, 500);
    return () => clearTimeout(debounceTimeout);
  }, [content, dateKey, noteId, addNote, updateNote]);
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  
  return (
    <div className="flex flex-col h-full p-4 bg-white">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        className="flex-grow p-4 text-lg border-none outline-none resize-none bg-green-50 rounded-lg"
        placeholder="Write your notes here..."
      />
    </div>
  );
};

export default NoteCanvas;