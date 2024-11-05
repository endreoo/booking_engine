import React from 'react';
import { Users } from 'lucide-react';
import { Guests } from './BookingEngine';

interface GuestSelectorProps {
  guests: Guests;
  onGuestChange: (guests: Guests) => void;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({ guests, onGuestChange }) => {
  const handleGuestChange = (type: 'adults' | 'children', value: number) => {
    onGuestChange({ ...guests, [type]: Math.max(0, value) });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Guests</h3>
      <div className="flex items-center space-x-4 p-4 border rounded-lg">
        <Users className="text-blue-600" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <span>Adults</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleGuestChange('adults', guests.adults - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-8 text-center">{guests.adults}</span>
              <button
                onClick={() => handleGuestChange('adults', guests.adults + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Children</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleGuestChange('children', guests.children - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-8 text-center">{guests.children}</span>
              <button
                onClick={() => handleGuestChange('children', guests.children + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestSelector;