import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeBookingEngine } from './config/BookingEngineConfig';

// Initialize with any config from window
const config = (window as any).BOOKING_ENGINE_CONFIG || {};
initializeBookingEngine(config);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);