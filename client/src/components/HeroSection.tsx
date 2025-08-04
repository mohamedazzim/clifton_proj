import { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { useLanguage } from "./LanguageProvider";

const heroImages = [
  "images/hero_bg/1.png", // Cargo ship at port

  
  "images/hero_bg/2.jpg",// Airplane in flight

  
  "images/hero_bg/3.jpg", // Container port aerial view

  
  "images/hero_bg/4.jpg", // Cargo plane loading

  
  "images/hero_bg/5.jpg", // Large cargo ship

  
  "images/hero_bg/6.png"  // Airport cargo terminal
];

const animations = [
  'animate-slide-left',
  'animate-slide-right', 
  'animate-zoom-in',
  'animate-zoom-out',
  'animate-fade-up',
  'animate-fade-down'
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      setCurrentAnimation((prev) => (prev + 1) % animations.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Optimized GSAP animations for hero content
  useEffect(() => {
    // Set initial state immediately to prevent flash
    gsap.set('.hero-title', { y: 30, opacity: 0 });
    gsap.set('.hero-subtitle', { y: 20, opacity: 0 });
    gsap.set('.hero-button', { y: 20, opacity: 0 });
    gsap.set('.hero-logo', { scale: 0.9, opacity: 0 });

    const timeline = gsap.timeline({ delay: 0.1 });

    // Create smooth, coordinated entrance sequence
    timeline
      .to('.hero-logo', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to('.hero-title', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4')
      .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3')
      .to('.hero-button', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.2');

    return () => {
      timeline.kill();
    };
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="min-h-screen hero-bg relative overflow-hidden max-w-full">
      {/* Auto-sliding Background Images with Smooth Transitions */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-70' 
                : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url(${image})`,
              filter: 'sepia(10%) brightness(1.1) contrast(0.9) saturate(0.8)',
              transform: index === currentSlide 
                ? 'scale(1.02)' 
                : 'scale(1.05)',
            }}
          />
        ))}
      </div>
      {/* Enhanced Background Overlay */}
      <div className="absolute inset-0 z-1">
        {/* Milk-white background overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(248, 250, 252, 0.45)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50/40 via-stone-50/20 to-stone-50/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/20 via-transparent to-stone-50/20"></div>
        
        {/* Sharp Edge Overlays for Light Mode */}
        <div className="absolute inset-0 overflow-hidden block dark:hidden">
          {/* Left Sharp Edge */}
          <svg className="absolute left-0 top-0 w-64 h-full" viewBox="0 0 200 1080" preserveAspectRatio="none">
            <polygon 
              points="0,0 0,1080 150,1080 200,540 150,0" 
              fill="rgba(255,255,255,0.1)" 
              stroke="rgba(0,0,0,0.1)" 
              strokeWidth="1"
            />
            <polygon 
              points="0,0 0,1080 120,1080 170,540 120,0" 
              fill="rgba(255,255,255,0.05)" 
              stroke="rgba(0,0,0,0.05)" 
              strokeWidth="0.5"
            />
          </svg>
          
          {/* Right Sharp Edge */}
          <svg className="absolute right-0 top-0 w-64 h-full" viewBox="0 0 200 1080" preserveAspectRatio="none">
            <polygon 
              points="200,0 200,1080 50,1080 0,540 50,0" 
              fill="rgba(255,255,255,0.1)" 
              stroke="rgba(0,0,0,0.1)" 
              strokeWidth="1"
            />
            <polygon 
              points="200,0 200,1080 80,1080 30,540 80,0" 
              fill="rgba(255,255,255,0.05)" 
              stroke="rgba(0,0,0,0.05)" 
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Moving Vectors Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            {/* Animated Lines - Symmetrical */}
            <g className="animate-pulse">
              <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="currentColor" strokeWidth="1" opacity="0.1" className="text-black dark:text-white">
                <animateTransform attributeName="transform" type="translate" values="0,0; 50,30; 0,0" dur="8s" repeatCount="indefinite"/>
              </line>
              <line x1="70%" y1="20%" x2="90%" y2="40%" stroke="currentColor" strokeWidth="1" opacity="0.1" className="text-black dark:text-white">
                <animateTransform attributeName="transform" type="translate" values="0,0; -50,30; 0,0" dur="8s" repeatCount="indefinite"/>
              </line>
              <line x1="20%" y1="80%" x2="40%" y2="60%" stroke="currentColor" strokeWidth="1" opacity="0.1" className="text-black dark:text-white">
                <animateTransform attributeName="transform" type="translate" values="0,0; 40,-20; 0,0" dur="12s" repeatCount="indefinite"/>
              </line>
              <line x1="60%" y1="80%" x2="80%" y2="60%" stroke="currentColor" strokeWidth="1" opacity="0.1" className="text-black dark:text-white">
                <animateTransform attributeName="transform" type="translate" values="0,0; -40,-20; 0,0" dur="12s" repeatCount="indefinite"/>
              </line>
            </g>
            
            {/* Animated Arrows - Symmetrical */}
            <g className="animate-pulse">
              <path d="M15,25 L35,35 M30,30 L35,35 L30,40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15" className="text-black dark:text-white">
                <animateTransform attributeName="transform" type="translate" values="0,0; 100,50; 0,0" dur="15s" repeatCount="indefinite"/>
              </path>
              <path d="M75,25 L95,35 M90,30 L95,35 L90,40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15" className="text-black dark:text-white">
                <animateTransform attributeName="transform" type="translate" values="0,0; -100,50; 0,0" dur="15s" repeatCount="indefinite"/>
              </path>
            </g>
            
            {/* Animated Geometric Shapes - Symmetrical */}
            <g className="animate-pulse">
              <circle cx="15%" cy="75%" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.1" className="text-black dark:text-white">
                <animateTransform attributeName="transform" type="translate" values="0,0; 80,-40; 0,0" dur="20s" repeatCount="indefinite"/>
              </circle>
              <circle cx="85%" cy="75%" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.1" className="text-black dark:text-white">
                <animateTransform attributeName="transform" type="translate" values="0,0; -80,-40; 0,0" dur="20s" repeatCount="indefinite"/>
              </circle>
              <polygon points="10,10 20,5 30,10 25,20 15,20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.1" className="text-black dark:text-white">
                <animateTransform attributeName="transform" type="translate" values="0,0; 120,60; 0,0" dur="22s" repeatCount="indefinite"/>
              </polygon>
              <polygon points="90,10 100,5 110,10 105,20 95,20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.1" className="text-black dark:text-white">
                <animateTransform attributeName="transform" type="translate" values="0,0; -120,60; 0,0" dur="22s" repeatCount="indefinite"/>
              </polygon>
            </g>
          </svg>
        </div>
      </div>
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mt-[50px]">
            <div className="mb-6">
              <div className="flex justify-center items-center mb-4">
                {/* Logo for light mode */}
                <img 
                  src="/images/logo/CLIFTON-CUT-BLACK.png" 
                  alt="CLIFTON Logo" 
                  className="hero-logo h-16 sm:h-24 md:h-28 lg:h-32 xl:h-36 2xl:h-40 w-auto dark:hidden"
                />
                {/* Logo for dark mode */}
                <img 
                  src="/images/logo/CLIFTON-CUT-WHITE.png" 
                  alt="CLIFTON Logo" 
                  className="hero-logo h-16 sm:h-24 md:h-28 lg:h-32 xl:h-36 2xl:h-40 w-auto hidden dark:block"
                />
              </div>
            </div>

            {/* Professional Hero Text */}
            <div className="mb-8 text-center">
              <div className="hero-title flex items-center justify-center gap-3 sm:gap-4 flex-wrap animate-fade-up animation-delay-300">
                <span className="text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-black text-gray-900 dark:text-gray-100 tracking-wider leading-none" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif', fontWeight: '900', letterSpacing: '0.15em', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>CLIFTON</span>
                
                <span className="text-lg sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif', fontWeight: '700', letterSpacing: '0.1em', textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>{t("heroSection.import")}</span>

                <span className="text-lg sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-light text-gray-700 dark:text-gray-300" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif', fontWeight: '300', letterSpacing: '0.05em' }}>{t("heroSection.and")}</span>

                <span className="text-lg sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif', fontWeight: '700', letterSpacing: '0.1em', textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>{t("heroSection.export")}</span>

                <span className="text-base sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-medium text-gray-700 dark:text-gray-300" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif', fontWeight: '500', letterSpacing: '0.08em' }}>{t("heroSection.with")}</span>
                
                <span className="text-lg sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif', fontWeight: '700', letterSpacing: '0.1em', textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>{t("heroSection.delivery")}</span>
              </div>
            </div>
            
            <div className="relative">
              <p className="hero-subtitle text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-10 dark:text-gray-300 animate-fade-up animation-delay-1500 max-w-4xl mx-auto leading-relaxed font-medium text-[#2f3440] px-4">
{t("hero.subtitle")}
              </p>
              
              {/* Animated underline */}
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gray-800 dark:via-gray-200 to-gray-800 mx-auto mb-12 animate-pulse"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-slide-up animation-delay-900 px-4">
              <button 
                onClick={scrollToProducts}
                className="hero-button group noise-grid gradient-border glass px-4 sm:px-8 py-2 sm:py-4 rounded-md text-black dark:text-white hover-scale transition-all duration-500 font-semibold text-sm sm:text-lg relative overflow-hidden"
              >
                <span className="relative z-10">{t("hero.cta.primary")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
              <button 
                onClick={scrollToContact}
                className="hero-button group bg-black dark:bg-white text-white dark:text-black px-4 sm:px-8 py-2 sm:py-4 rounded-md hover-scale transition-all duration-500 font-semibold text-sm sm:text-lg border-2 border-transparent hover:border-black/20 dark:hover:border-white/20 relative overflow-hidden"
              >
                <span className="relative z-10">{t("hero.cta.secondary")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 dark:from-black/5 dark:to-black/10 transform skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
            </div>

            {/* Floating Elements - Symmetrical */}
            <div className="absolute top-1/4 left-10 w-4 h-4 bg-white/20 dark:bg-black/20 rounded-full animate-float animation-delay-1000"></div>
            <div className="absolute top-1/4 right-10 w-4 h-4 bg-white/20 dark:bg-black/20 rounded-full animate-float animation-delay-1000"></div>
            <div className="absolute top-1/3 left-16 w-6 h-6 border-2 border-white/30 dark:border-black/30 rounded-full animate-float animation-delay-1500"></div>
            <div className="absolute top-1/3 right-16 w-6 h-6 border-2 border-white/30 dark:border-black/30 rounded-full animate-float animation-delay-1500"></div>
            <div className="absolute bottom-1/4 left-20 w-2 h-2 bg-white/40 dark:bg-black/40 rounded-full animate-float animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-20 w-2 h-2 bg-white/40 dark:bg-black/40 rounded-full animate-float animation-delay-2000"></div>
          </div>
        </div>
      </div>
      {/* Mouse Scroll Animation */}
      <div 
        className="absolute bottom-8 right-8 cursor-pointer group animate-fade-up animation-delay-2000"
        onClick={() => {
          const aboutSection = document.querySelector('#about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          {/* Mouse Icon - Outline Only */}
          <div className="w-7 h-11 border-2 border-gray-700 dark:border-gray-300 rounded-2xl relative group-hover:border-gray-900 dark:group-hover:border-gray-100 transition-colors duration-300 animate-mouse-scroll">
            {/* Mouse button separator line */}
            <div className="absolute top-0 left-1/2 w-px h-4 bg-gray-700 dark:bg-gray-300 transform -translate-x-1/2"></div>
            {/* Scroll Wheel */}
            <div className="w-1 h-2 border border-gray-700 dark:border-gray-300 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 group-hover:border-gray-900 dark:group-hover:border-gray-100 transition-colors duration-300">
              {/* Scroll indicator dot */}
              <div className="w-0.5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce group-hover:bg-gray-900 dark:group-hover:bg-gray-100 transition-colors duration-300"></div>
            </div>
          </div>
          {/* Scroll Down Text */}
          <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300 font-medium">
            Scroll Down
          </span>
        </div>
      </div>

      {/* Carousel Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-gray-800 scale-125 shadow-lg' 
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
