import React, { useState } from 'react';
import { ArrowLeft, Calculator, FileText, Settings } from 'lucide-react';
import useCalendarStore from '../store/useCalendarStore';
import useNotesStore from '../store/useNotesStore';
import { format } from 'date-fns';

interface NoteHeaderProps {
  onBackToCalendar: () => void;
}

const NoteHeader: React.FC<NoteHeaderProps> = ({ onBackToCalendar }) => {
  const { selectedDate } = useCalendarStore();
  const { activeNoteType, setActiveNoteType, resetAllData } = useNotesStore();
  const [showSettings, setShowSettings] = useState(false);
  
  const handleModeToggle = (type: 'math' | 'text') => {
    setActiveNoteType(type);
  };
  
  const handleFactoryReset = () => {
    if (window.confirm('Are you sure you want to delete all notes? This action cannot be undone.')) {
      resetAllData();
      setShowSettings(false);
    }
  };
  
  return (
    <header className="relative flex items-center justify-between p-4 border-b border-gray-200 bg-white">
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

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {showSettings && (
        <div className="absolute right-4 top-16 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Settings</h3>
          <button
            onClick={handleFactoryReset}
            className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors text-left"
          >
            Factory Reset
          </button>
        </div>
      )}
    </header>
  );
};

export default NoteHeader;