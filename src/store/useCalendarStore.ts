import { create } from 'zustand';
import { addMonths, subMonths } from 'date-fns';
import { CalendarState } from '../types';

const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(),
  selectedDate: new Date(),
  
  setCurrentDate: (date: Date) => set({ currentDate: date }),
  
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
  
  goToNextMonth: () => set((state) => ({ 
    currentDate: addMonths(state.currentDate, 1) 
  })),
  
  goToPrevMonth: () => set((state) => ({ 
    currentDate: subMonths(state.currentDate, 1) 
  }))
}));

export default useCalendarStore;