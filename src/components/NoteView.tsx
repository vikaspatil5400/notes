import React from 'react';
import NoteHeader from './NoteHeader';
import MathCanvas from './MathCanvas';
import NoteCanvas from './NoteCanvas';
import useNotesStore from '../store/useNotesStore';

interface NoteViewProps {
  onBackToCalendar: () => void;
}

const NoteView: React.FC<NoteViewProps> = ({ onBackToCalendar }) => {
  const { activeNoteType } = useNotesStore();
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
      <NoteHeader onBackToCalendar={onBackToCalendar} />
      
      <div className="flex-grow overflow-hidden">
        {activeNoteType === 'math' ? (
          <MathCanvas />
        ) : (
          <NoteCanvas />
        )}
      </div>
    </div>
  );
};

export default NoteView;