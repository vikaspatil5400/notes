import React from 'react';
import { ArrowLeft, Calculator, FileText } from 'lucide-react';
import useCalendarStore from '../store/useCalendarStore';
import useNotesStore from '../store/useNotesStore';
import { format } from 'date-fns';

interface NoteHeaderProps {
  onBackToCalendar: () => void;
}

const NoteHeader: React.FC<NoteHeaderProps> = ({ onBackToCalendar }) => {
  const { selectedDate } = useCalendarStore();
  const { activeNoteType, setActiveNoteType } = useNotesStore();
  
  const handleModeToggle = (type: 'math' | 'text') => {
    setActiveNoteType(type);
  };
  
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBackToCalendar}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Back to calendar"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <h2 className="text-lg font-medium text-gray-800">
          {format(selectedDate, 'MMMM d, yyyy')}
        </h2>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => handleModeToggle('math')}
          className={`px-3 py-2 rounded-md flex items-center space-x-1 transition-colors ${
            activeNoteType === 'math' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Math mode"
        >
          <Calculator className="h-4 w-4" />
          <span className="text-sm">Math</span>
        </button>
        
        <button 
          onClick={() => handleModeToggle('text')}
          className={`px-3 py-2 rounded-md flex items-center space-x-1 transition-colors ${
            activeNoteType === 'text' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Text mode"
        >
          <FileText className="h-4 w-4" />
          <span className="text-sm">Notes</span>
        </button>
      </div>
    </header>
  );
};

export default NoteHeader;