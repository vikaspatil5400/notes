import React, { useState } from 'react';
import Calendar from './components/Calendar';
import NoteView from './components/NoteView';
import { Github, Globe, Settings } from 'lucide-react';
import useNotesStore from './store/useNotesStore';

function App() {
  const [showNoteView, setShowNoteView] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { resetAllData } = useNotesStore();
  
  const handleShowNotes = () => {
    setShowNoteView(true);
  };
  
  const handleBackToCalendar = () => {
    setShowNoteView(false);
  };

  const handleFactoryReset = () => {
    if (window.confirm('Are you sure you want to delete all notes? This action cannot be undone.')) {
      resetAllData();
      setShowSettings(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl transition-all duration-300 ease-in-out">
        <header className="mb-6 text-center relative">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CalsMath</h1>
          <p className="text-gray-600">Smart Calculator & Notes with Calendar Integration</p>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute right-0 top-0 p-2 rounded-md text-gray-600 hover:bg-gray-100/50 transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          {showSettings && (
            <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
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
        
        <div className="w-full transition-opacity duration-300">
          {showNoteView ? (
            <NoteView onBackToCalendar={handleBackToCalendar} />
          ) : (
            <Calendar onDateDoubleClick={handleShowNotes} />
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