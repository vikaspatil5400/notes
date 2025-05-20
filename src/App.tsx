import React, { useState } from 'react';
import Calendar from './components/Calendar';
import NoteView from './components/NoteView';
import { PenSquare, Github, Globe } from 'lucide-react';

function App() {
  const [showNoteView, setShowNoteView] = useState(false);
  
  const handleShowNotes = () => {
    setShowNoteView(true);
  };
  
  const handleBackToCalendar = () => {
    setShowNoteView(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl transition-all duration-300 ease-in-out">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Canvas Notepad</h1>
          <p className="text-gray-600">Your calendar-based math and notes workspace</p>
        </header>
        
        <div className="w-full transition-opacity duration-300">
          {showNoteView ? (
            <NoteView onBackToCalendar={handleBackToCalendar} />
          ) : (
            <>
              <Calendar />
              <button
                id="openNotesBtn"
                onClick={handleShowNotes}
                className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md flex items-center justify-center transition-colors"
                aria-label="Open notes"
              >
                <PenSquare className="mr-2 h-5 w-5" />
                <span>Open Notes</span>
              </button>
            </>
          )}
        </div>
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p className="mb-2">All data is stored locally on your device</p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://github.com/PATILYASHH"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <Github className="h-4 w-4 mr-1" />
              <span>PATILYASHH</span>
            </a>
            <a
              href="https://yashpatil.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <Globe className="h-4 w-4 mr-1" />
              <span>yashpatil.tech</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;