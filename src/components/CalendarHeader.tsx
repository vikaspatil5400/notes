import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useCalendarStore from '../store/useCalendarStore';
import { formatMonthYear } from '../utils/dateUtils';

const CalendarHeader: React.FC = () => {
  const { currentDate, goToPrevMonth, goToNextMonth } = useCalendarStore();
  
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200">
      <button 
        onClick={goToPrevMonth}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Previous month"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      
      <h2 className="text-xl font-semibold text-gray-800">
        {formatMonthYear(currentDate)}
      </h2>
      
      <button 
        onClick={goToNextMonth}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Next month"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </header>
  );
};

export default CalendarHeader;