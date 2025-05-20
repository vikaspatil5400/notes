import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isEqual, isToday, isSameMonth } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const formatDayOfMonth = (date: Date): string => {
  return format(date, 'd');
};

export const getCalendarDays = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const startDayOfWeek = getDay(monthStart);
  
  // Create a new array including leading placeholder days for alignment
  let calendarDays: Date[] = Array(startDayOfWeek).fill(null);
  
  // Add the actual days of the month
  calendarDays = [...calendarDays, ...daysInMonth];
  
  return calendarDays;
};

export const getDayClasses = (
  day: Date | null, 
  currentMonth: Date, 
  selectedDate: Date
): string => {
  if (!day) return 'invisible';
  
  let classes = 'relative flex items-center justify-center h-10 w-10 rounded-full transition-colors';
  
  // For days from other months
  if (!isSameMonth(day, currentMonth)) {
    classes += ' text-gray-400';
  } else {
    classes += ' hover:bg-blue-100';
  }
  
  // For today
  if (isToday(day)) {
    classes += ' border border-blue-400';
  }
  
  // For selected day
  if (isEqual(day, selectedDate)) {
    classes += ' bg-blue-500 text-white hover:bg-blue-600';
  }
  
  return classes;
};