import React, { useState, useEffect, useRef } from 'react';
import useNotesStore from '../store/useNotesStore';
import useCalendarStore from '../store/useCalendarStore';
import { formatDate } from '../utils/dateUtils';
import { evaluateMathExpression } from '../utils/mathUtils';

const MathCanvas: React.FC = () => {
  const { selectedDate } = useCalendarStore();
  const { addNote, updateNote, getNotesByDate } = useNotesStore();
  const dateKey = formatDate(selectedDate);
  
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [noteId, setNoteId] = useState<string | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Load existing math note for the selected date
  useEffect(() => {
    const notes = getNotesByDate(dateKey);
    const mathNote = notes.find(note => note.type === 'math');
    
    if (mathNote) {
      try {
        const data = JSON.parse(mathNote.content);
        setExpression(data.expression || '');
        setResult(data.result || '');
        setNoteId(mathNote.id);
      } catch (error) {
        console.error('Error parsing math note:', error);
        setExpression('');
        setResult('');
        setNoteId(null);
      }
    } else {
      setExpression('');
      setResult('');
      setNoteId(null);
    }
    
    // Focus on textarea after load
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  }, [dateKey, getNotesByDate]);
  
  // Save note when expression changes
  useEffect(() => {
    const saveNote = () => {
      const mathData = JSON.stringify({
        expression,
        result
      });
      
      if (expression.trim()) {
        if (noteId) {
          updateNote(dateKey, noteId, mathData);
        } else {
          const id = addNote(dateKey, 'math', mathData);
          setNoteId(id);
        }
      }
    };
    
    const debounceTimeout = setTimeout(saveNote, 500);
    return () => clearTimeout(debounceTimeout);
  }, [expression, result, dateKey, noteId, addNote, updateNote]);
  
  const handleExpressionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newExpression = e.target.value;
    setExpression(newExpression);
    
    try {
      if (newExpression.trim()) {
        const calculatedResult = evaluateMathExpression(newExpression);
        setResult(calculatedResult);
      } else {
        setResult('');
      }
    } catch (error) {
      console.error('Math evaluation error:', error);
      setResult('Error');
    }
  };
  
  const handleCalculate = () => {
    if (expression.trim()) {
      try {
        const calculatedResult = evaluateMathExpression(expression);
        setResult(calculatedResult);
      } catch (error) {
        console.error('Math evaluation error:', error);
        setResult('Error');
      }
    }
  };
  
  return (
    <div className="flex flex-col h-full p-4 bg-white">
      <div className="flex-grow flex flex-col">
        <textarea
          ref={textareaRef}
          value={expression}
          onChange={handleExpressionChange}
          className="flex-grow p-4 text-lg font-mono border-none outline-none resize-none bg-blue-50 rounded-t-lg"
          placeholder="Enter your math expression here..."
        />
        
        <div className="flex justify-between items-center p-4 bg-gray-100 border-t border-gray-200 rounded-b-lg">
          <span className="text-gray-600 text-sm">Result</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-lg">{result}</span>
            <button
              onClick={handleCalculate}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathCanvas;