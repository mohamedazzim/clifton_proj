import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="back-to-top-button fixed bottom-6 right-6 z-[9999] p-4 rounded-full bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-300/60 text-gray-900 hover:text-gray-600 transition-all duration-300 hover:scale-110 group"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
        </button>
      )}
    </>
  );
}