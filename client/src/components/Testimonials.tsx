import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

interface Testimonial {
  name: string;
  testimonial: string;
}

export function Testimonials() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "Maria Rodriguez",
      testimonial: "CLIFTON has been our trusted partner for coffee imports for over 5 years. Their quality and reliability are unmatched in the industry."
    },
    {
      name: "Ahmed Hassan",
      testimonial: "The best salt supplier we've worked with. Consistent quality, competitive pricing, and excellent customer service every time."
    },
    {
      name: "Sarah Johnson",
      testimonial: "Their sugar products meet all our specifications perfectly. Fast delivery and transparent communication throughout the process."
    },
    {
      name: "Carlos Martinez",
      testimonial: "CLIFTON's soye products have helped us expand our business. Professional team and sustainable sourcing practices."
    },
    {
      name: "Elena Popov",
      testimonial: "Outstanding logistics and supply chain management. They handle everything from sourcing to delivery with excellence."
    },
    {
      name: "David Kim",
      testimonial: "Reliable partner for our international trade needs. Their expertise in global markets is impressive and valuable."
    }
  ];

  // Auto-rotate testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-black dark:to-purple-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-200/30 dark:border-purple-700/30 mb-6">
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Client Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white px-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Clients Say</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed pb-8 sm:pb-10 px-4">
            Trusted by businesses worldwide for premium commodity trading
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Desktop: Circular Animation Container */}
          <div className="relative w-full max-w-6xl mx-auto h-[500px] hidden min-[800px]:flex min-[800px]:items-center min-[800px]:justify-center">
            {testimonials.map((testimonial, index) => {
              // Calculate position on circle
              const angle = (index * 360) / testimonials.length - (currentIndex * 360) / testimonials.length;
              const radian = (angle * Math.PI) / 180;
              const radius = 200; // Distance from center
              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;
              
              // Determine if this testimonial is currently active (closest to center/front)
              const isActive = index === currentIndex;
              const normalizedAngle = ((angle % 360) + 360) % 360;
              const isVisible = normalizedAngle <= 90 || normalizedAngle >= 270; // Front half of circle

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-1000 ease-in-out ${
                    isActive 
                      ? 'z-20 scale-110 opacity-100' 
                      : isVisible 
                        ? 'z-10 scale-90 opacity-70' 
                        : 'z-0 scale-75 opacity-30'
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px) ${!isVisible ? 'rotateY(180deg)' : ''}`,
                  }}
                >
                  <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-800 w-80 sm:w-96">
                    {/* Quote Marks */}
                    <div className="flex justify-center mb-4">
                      <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed mb-6 min-h-[4rem]">
                      "{testimonial.testimonial}"
                    </p>
                    
                    {/* Name */}
                    <div className="text-center">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                        {testimonial.name}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Linear Layout for devices below 800px */}
          <div className="block min-[800px]:hidden">
            <div className="relative w-full h-80 flex items-center justify-center overflow-hidden">
              {testimonials.map((testimonial, index) => {
                const getPrevIndex = (current: number) => current === 0 ? testimonials.length - 1 : current - 1;
                const getNextIndex = (current: number) => current === testimonials.length - 1 ? 0 : current + 1;
                
                const isMain = index === currentIndex;
                const isPrev = index === getPrevIndex(currentIndex);
                const isNext = index === getNextIndex(currentIndex);
                
                if (!isMain && !isPrev && !isNext) return null;
                
                let translateX = 0;
                let opacity = 0.5;
                let zIndex = 1;
                
                if (isMain) {
                  translateX = 0;
                  opacity = 1;
                  zIndex = 10;
                } else if (isPrev) {
                  translateX = -200;
                  opacity = 0.5;
                  zIndex = 5;
                } else if (isNext) {
                  translateX = 200;
                  opacity = 0.5;
                  zIndex = 5;
                }
                
                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-500 ease-in-out"
                    style={{
                      transform: `translateX(${translateX}px)`,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 w-80">
                      {/* Quote Marks */}
                      <div className="flex justify-center mb-4">
                        <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>
                      
                      {/* Testimonial Text */}
                      <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed mb-6 min-h-[4rem]">
                        "{testimonial.testimonial}"
                      </p>
                      
                      {/* Name */}
                      <div className="text-center">
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                          {testimonial.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-purple-600 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-purple-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}