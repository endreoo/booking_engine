import React from 'react';
import BookingEngine from './components/BookingEngine';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Perfect Stay
          </h1>
          <p className="text-lg text-gray-600">
            Find and book your ideal room with our easy-to-use booking engine
          </p>
        </div>
        <BookingEngine />
      </div>
    </div>
  );
}

export default App;