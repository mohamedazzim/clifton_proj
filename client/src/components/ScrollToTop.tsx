import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { LoadingScreen } from './LoadingScreen';

export function ScrollToTop() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Skip loading screen on initial page load
    if (isFirstLoad) {
      setIsFirstLoad(false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      return;
    }

    // Show loading screen for navigation
    setIsLoading(true);
  }, [location, isFirstLoad]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  };

  return isLoading ? <LoadingScreen onComplete={handleLoadingComplete} duration={1500} /> : null;
}