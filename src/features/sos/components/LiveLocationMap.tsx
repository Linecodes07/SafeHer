import React from 'react';
import { MapPin, Navigation, Battery } from 'lucide-react';
import { useSosStore } from '../../../store/sos';

export const LiveLocationMap: React.FC = () => {
  const currentLocation = useSosStore((state) => state.currentLocation);
  
  // In a production app, we would use react-google-maps/api or react-leaflet here.
  // For the architecture setup without forcing an API key requirement:
  
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
      <div className="absolute inset-0 z-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=2&size=600x400&sensor=false&style=feature:all|element:labels|visibility:off&style=feature:water|color:0x222222&style=feature:landscape|color:0x444444')] bg-cover bg-center opacity-30 dark:opacity-50 grayscale" />
      
      {currentLocation ? (
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex h-8 w-8 rounded-full bg-pink-600 shadow-lg border-2 border-white"></span>
          </div>
          <div className="mt-4 rounded-lg bg-white/90 px-4 py-2 text-center shadow-md backdrop-blur-sm dark:bg-gray-900/90">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Location</p>
            <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
              {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
            </p>
            <p className="text-xs text-gray-500 flex items-center justify-center mt-1">
              <Navigation className="h-3 w-3 mr-1" />
              Accuracy: ±{Math.round(currentLocation.accuracy)}m
            </p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center text-gray-500 dark:text-gray-400">
          <MapPin className="mb-2 h-8 w-8 animate-bounce" />
          <p className="font-medium">Locating...</p>
        </div>
      )}
      
      <div className="absolute bottom-4 right-4 z-10 flex items-center rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm dark:bg-gray-900/90 dark:text-gray-300">
        <Battery className="mr-1 h-4 w-4 text-green-500" />
        Efficient updates
      </div>
    </div>
  );
};
