import React, { useState } from 'react';
import DateSelector from './DateSelector';
import GuestSelector from './GuestSelector';
import RoomList from './RoomList';
import ExtrasSelector from './ExtrasSelector';
import PersonalDetailsForm from './PersonalDetailsForm';
import PaymentForm from './PaymentForm';
import ProgressSteps from './ProgressSteps';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// ... (keep existing interfaces and rooms data)

const BookingEngine: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 86400000)
  });
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0 });
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [extras, setExtras] = useState<Set<string>>(new Set());

  const goBack = () => {
    setStep(Math.max(1, step - 1));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <DateSelector dateRange={dateRange} onDateChange={setDateRange} />
              <GuestSelector guests={guests} onGuestChange={setGuests} />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>View Available Rooms</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Select Your Room</h3>
            <RoomList
              rooms={rooms}
              selectedRoom={selectedRoom}
              onRoomSelect={setSelectedRoom}
            />
            <div className="flex justify-between">
              <button
                onClick={goBack}
                className="px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center space-x-2"
              >
                <ChevronLeft size={20} />
                <span>Back</span>
              </button>
              {selectedRoom && (
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <span>Continue to Extras</span>
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Enhance Your Stay</h3>
            <ExtrasSelector extras={extras} onExtraToggle={setExtras} />
            <div className="flex justify-between">
              <button
                onClick={goBack}
                className="px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center space-x-2"
              >
                <ChevronLeft size={20} />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Continue to Details</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Personal Details</h3>
            <PersonalDetailsForm onComplete={() => setStep(5)} onBack={goBack} />
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Payment</h3>
            <PaymentForm onComplete={() => setStep(6)} onBack={goBack} />
          </div>
        );
      case 6:
        return (
          <div className="text-center space-y-4">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-600">Booking Confirmed!</h3>
            <p className="text-gray-600">
              Thank you for your booking. A confirmation email has been sent to your address.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <ProgressSteps currentStep={step} totalSteps={6} />
      {renderStepContent()}
    </div>
  );
};

export default BookingEngine;