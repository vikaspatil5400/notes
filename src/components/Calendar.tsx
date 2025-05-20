import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

const Calendar: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all">
      <CalendarHeader />
      <CalendarGrid />
    </div>
  );
};

export default Calendar;