import React from 'react';
import { formatDayOfMonth, getCalendarDays, getDayClasses } from '../utils/dateUtils';
import useCalendarStore from '../store/useCalendarStore';
import useNotesStore from '../store/useNotesStore';
import { formatDate } from '../utils/dateUtils';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarGridProps {
  onDateDoubleClick: () => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ onDateDoubleClick }) => {
  const { currentDate, selectedDate, setSelectedDate } = useCalendarStore();
  const { notes } = useNotesStore();
  const calendarDays = getCalendarDays(currentDate);
  
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
  };
  
  // Check if a date has notes
  const hasNotes = (day: Date | null): boolean => {
    if (!day) return false;
    const dateKey = formatDate(day);
    return Boolean(notes[dateKey]?.length);
  };
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-7 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div key={index} className="aspect-square p-1">
            {day && (
              <button
                className={getDayClasses(day, currentDate, selectedDate)}
                onClick={() => handleDayClick(day)}
                onDoubleClick={() => {
                  handleDayClick(day);
                  onDateDoubleClick();
                }}
              >
                {day && formatDayOfMonth(day)}
                {hasNotes(day) && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;