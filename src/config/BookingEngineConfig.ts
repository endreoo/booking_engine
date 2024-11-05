export interface BookingEngineConfig {
  containerId?: string;
  apiEndpoint?: string;
  theme?: {
    primary: string;
    secondary: string;
  };
  hotelId: string;
  currency: string;
}

export const defaultConfig: BookingEngineConfig = {
  hotelId: 'default',
  currency: 'USD',
  theme: {
    primary: '#2563eb', // blue-600
    secondary: '#1e40af', // blue-800
  }
};

let currentConfig = { ...defaultConfig };

export const initializeBookingEngine = (config: Partial<BookingEngineConfig>) => {
  currentConfig = { ...defaultConfig, ...config };
  return currentConfig;
};

export const getConfig = () => currentConfig;