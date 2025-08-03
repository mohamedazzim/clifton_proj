import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

// Global GSAP configuration for optimal performance
export const initializeGSAP = () => {
  // Set global defaults for consistent performance
  gsap.defaults({
    duration: 0.8,
    ease: 'power2.out',
    force3D: true // Enable hardware acceleration
  });

  // Configure ScrollTrigger for optimal performance
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    ignoreMobileResize: true
  });

  // Reduce motion for accessibility
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.1);
    ScrollTrigger.config({
      autoRefreshEvents: 'none'
    });
  }
};

// Performance-optimized animation presets
export const animations = {
  fadeInUp: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
  },
  scaleIn: {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
  },
  staggerCards: {
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
  }
};

// Cleanup function for proper memory management
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};