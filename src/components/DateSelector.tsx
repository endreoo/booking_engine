import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { DateRange } from './BookingEngine';

interface DateSelectorProps {
  dateRange: DateRange;
  onDateChange: (dates: DateRange) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ dateRange, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectionState, setSelectionState] = useState<'start' | 'end'>('start');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const isDateInRange = (date: Date) => {
    return date >= dateRange.checkIn && date <= dateRange.checkOut;
  };

  const isDateSelectable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handleDateClick = (date: Date) => {
    if (!isDateSelectable(date)) return;

    if (selectionState === 'start') {
      onDateChange({ checkIn: date, checkOut: date });
      setSelectionState('end');
    } else {
      if (date < dateRange.checkIn) {
        onDateChange({ checkIn: date, checkOut: date });
        setSelectionState('end');
      } else {
        onDateChange({ ...dateRange, checkOut: date });
        setSelectionState('start');
        setIsOpen(false);
      }
    }
  };

  const handleCheckInClick = () => {
    setSelectionState('start');
    setIsOpen(true);
  };

  const handleCheckOutClick = () => {
    setSelectionState('end');
    setIsOpen(true);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    if (newDate >= new Date()) {
      setCurrentMonth(newDate);
    }
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const days = [];
    const monthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Render calendar header
    const header = (
      <div className="flex justify-between items-center mb-4 p-2">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-semibold">{monthYear}</h3>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );

    // Render weekday headers
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
      <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
        {day}
      </div>
    ));

    // Fill in blank days from previous month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Fill in days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = isDateInRange(date);
      const isSelectable = isDateSelectable(date);
      const isToday = new Date().toDateString() === date.toDateString();
      const isCheckIn = date.toDateString() === dateRange.checkIn.toDateString();
      const isCheckOut = date.toDateString() === dateRange.checkOut.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => isSelectable && handleDateClick(date)}
          className={`
            p-2 text-center cursor-pointer relative transition-all duration-200
            ${isSelectable ? 'hover:bg-blue-50' : 'opacity-50 cursor-not-allowed'}
            ${isSelected && !isCheckIn && !isCheckOut ? 'bg-blue-50' : ''}
            ${isToday ? 'font-bold' : ''}
            ${isCheckIn ? 'rounded-l-lg bg-blue-600 text-white hover:bg-blue-700' : ''}
            ${isCheckOut ? 'rounded-r-lg bg-blue-600 text-white hover:bg-blue-700' : ''}
          `}
        >
          <span className="relative z-10">{day}</span>
          {isSelected && !isCheckIn && !isCheckOut && (
            <div className="absolute inset-0 bg-blue-50 -z-10"></div>
          )}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        {header}
        <div className="grid grid-cols-7 gap-1">
          {weekDays}
          {days}
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center">
          {selectionState === 'start' ? 'Select check-in date' : 'Select check-out date'}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Dates</h3>
      <div className="relative">
        <div className="flex items-center space-x-4 p-4 border rounded-lg">
          <Calendar className="text-blue-600" />
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div
              onClick={handleCheckInClick}
              className={`cursor-pointer transition-all duration-200 ${
                selectionState === 'start' ? 'bg-blue-50 -m-2 p-2 rounded-lg' : ''
              }`}
            >
              <div className="text-sm text-gray-600">Check-in</div>
              <div className="font-medium">{formatDate(dateRange.checkIn)}</div>
            </div>
            <div
              onClick={handleCheckOutClick}
              className={`cursor-pointer transition-all duration-200 ${
                selectionState === 'end' ? 'bg-blue-50 -m-2 p-2 rounded-lg' : ''
              }`}
            >
              <div className="text-sm text-gray-600">Check-out</div>
              <div className="font-medium">{formatDate(dateRange.checkOut)}</div>
            </div>
          </div>
        </div>
        
        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl">
            {renderCalendar()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelector;