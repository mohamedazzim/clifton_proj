import { useEffect, useRef, useState } from "react";

export function useParallax(speed: number = 0.5) {
  const elementRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('translateY(0px)');

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate if element is in viewport
      const elementBottom = elementTop + elementHeight;
      const isInViewport = scrolled + windowHeight > elementTop && scrolled < elementBottom;

      if (isInViewport) {
        const yPos = -(scrolled - elementTop) * speed;
        setTransform(`translateY(${yPos}px)`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return { elementRef, transform };
}