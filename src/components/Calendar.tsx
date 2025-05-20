import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

interface CalendarProps {
  onDateDoubleClick: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateDoubleClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all">
      <CalendarHeader />
      <CalendarGrid onDateDoubleClick={onDateDoubleClick} />
    </div>
  );
};

export default Calendar;