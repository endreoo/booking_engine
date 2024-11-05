import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeBookingEngine, BookingEngineConfig } from './config/BookingEngineConfig';

declare global {
  interface Window {
    BookingEngine?: {
      init: (config: Partial<BookingEngineConfig>) => void;
    };
  }
}

// Create global initialization function
window.BookingEngine = {
  init: (config: Partial<BookingEngineConfig>) => {
    const finalConfig = initializeBookingEngine(config);
    const container = document.getElementById(finalConfig.containerId || 'booking-engine');
    
    if (!container) {
      throw new Error(`Container element with id "${finalConfig.containerId || 'booking-engine'}" not found`);
    }

    createRoot(container).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
};