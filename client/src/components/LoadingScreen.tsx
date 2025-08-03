import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
}

export function LoadingScreen({ onComplete, duration = 2000 }: LoadingScreenProps) {
  const { theme } = useTheme();
  const [isZooming, setIsZooming] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Function to check if all images are loaded
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll('img');
      let loadedCount = 0;
      
      if (images.length === 0) {
        setImagesLoaded(true);
        return;
      }

      images.forEach((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          loadedCount++;
        } else {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              setImagesLoaded(true);
            }
          };
          img.onerror = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              setImagesLoaded(true);
            }
          };
        }
      });

      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };

    // Check images initially
    const initialTimer = setTimeout(checkImagesLoaded, 100);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      // Start zoom animation before completing
      const zoomTimer = setTimeout(() => {
        setIsZooming(true);
      }, 500);

      // Complete loading
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => {
        clearTimeout(zoomTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [imagesLoaded, onComplete]);

  const logoSrc = theme === 'dark' 
    ? '/images/logo/CLIFTON-CUT-WHITE.png'
    : '/images/logo/CLIFTON-CUT-BLACK.png';

  const bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';

  return (
    <div className={`loading-screen-container ${bgColor} transition-all duration-500 ${isZooming ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
      <div className="loading-screen-content">
        {/* Blinking Logo */}
        <div className="flex items-center justify-center mb-8">
          <img
            src={logoSrc}
            alt="CLIFTON Logo"
            className={`w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 object-contain transition-all duration-300 loading-blink ${
              isZooming ? 'scale-125' : 'scale-100'
            }`}
            style={{ 
              display: 'block',
              margin: '0 auto',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
        
        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          <div 
            className={`w-2 h-2 rounded-full loading-bounce ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
          ></div>
          <div 
            className={`w-2 h-2 rounded-full loading-bounce-delay-1 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
          ></div>
          <div 
            className={`w-2 h-2 rounded-full loading-bounce-delay-2 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
          ></div>
        </div>
      </div>
    </div>
  );
}