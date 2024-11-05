import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between relative">
        <div className="absolute top-1/2 h-0.5 bg-gray-200 w-full -z-10"></div>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              currentStep > index
                ? 'bg-blue-600 text-white'
                : currentStep === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-sm">Dates & Guests</div>
        <div className="text-sm">Select Room</div>
        <div className="text-sm">Extras</div>
        <div className="text-sm">Details</div>
        <div className="text-sm">Payment</div>
        <div className="text-sm">Confirm</div>
      </div>
    </div>
  );
};

export default ProgressSteps;