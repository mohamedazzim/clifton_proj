import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from "./LanguageProvider";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  order: number;
}

const getServiceIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'import services':
      return (
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V12M7 8V4M17 8V12M17 16V20M3 12H21M7 8H17" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 20L8 16H16L12 20Z" />
          </svg>
        </div>
      );
    case 'export services':
      return (
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16V12M17 8V4M7 8V12M7 16V20M21 12H3M17 8H7" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4L16 8H8L12 4Z" />
          </svg>
        </div>
      );
    case 'logistics & supply chain management':
      return (
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
      );
    case 'customs clearance':
      return (
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 2V8H22" />
          </svg>
        </div>
      );
    case 'market research & consulting':
      return (
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
          </svg>
        </div>
      );
  }
};

export function Products() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Tesla/Apple-style premium GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states with more sophisticated positioning
      gsap.set('.products-title', { y: 80, opacity: 0, scale: 0.9 });
      gsap.set('.products-subtitle', { y: 40, opacity: 0 });
      gsap.set('.product-card', { y: 120, opacity: 0, scale: 0.8, rotateX: 25 });

      // Premium entrance animation with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.to('.products-title', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out'
      })
      .to('.products-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6')
      .to('.product-card', {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.4');

      // Advanced hover effects for cards
      gsap.utils.toArray('.product-card').forEach((card: any) => {
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl.to(card, {
          y: -15,
          scale: 1.03,
          duration: 0.4,
          ease: 'power2.out'
        })
        .to(card.querySelector('.service-icon'), {
          scale: 1.1,
          rotateY: 10,
          duration: 0.4,
          ease: 'power2.out'
        }, 0);

        card.addEventListener('mouseenter', () => hoverTl.play());
        card.addEventListener('mouseleave', () => hoverTl.reverse());
      });

      // Continuous subtle floating animation
      gsap.utils.toArray('.product-card').forEach((card: any, index) => {
        gsap.to(card, {
          y: '+=8',
          duration: 3 + (index * 0.5),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.2
        });
      });
    });

    return () => ctx.revert();
  }, []);
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="noise-grid gradient-border glass rounded-2xl p-8 animate-pulse">
                <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-3xl mb-6"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">Failed to load services. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black relative overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="products-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Our Products & Services</h2>
          <p className="products-subtitle text-sm sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t("products.subtitle")}
          </p>
        </div>

        {/* Desktop and Tablet Grid Layout */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
          {products?.slice(0, 3).map((product, index) => (
            <div
              key={product.id}
              className="product-card noise-grid gradient-border glass rounded-2xl p-4 sm:p-6 lg:p-8 hover-scale transition-all duration-500 group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect for hover */}
              <div className="card-glow absolute inset-0 rounded-2xl opacity-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl transition-opacity duration-500"></div>
              
              {/* Moving Vector Elements */}
              <div className="absolute top-6 right-6 w-8 h-8 opacity-10 group-hover:opacity-20 transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-full h-full text-current">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1" fill="none">
                    <animateTransform attributeName="transform" type="rotate" values="0 12 12; 360 12 12" dur="10s" repeatCount="indefinite"/>
                  </path>
                </svg>
              </div>
              
              <div className="service-icon">
                {getServiceIcon(product.name)}
              </div>
              
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold bg-gradient-to-r from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 rounded-full border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300">
                  {product.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services for Larger Screens */}
        {products && products.length > 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {products.slice(3).map((product, index) => (
              <div
                key={product.id}
                className="noise-grid gradient-border glass rounded-2xl p-4 sm:p-6 lg:p-8 hover-scale transition-all duration-500 group relative overflow-hidden"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                {/* Moving Vector Elements */}
                <div className="absolute top-6 right-6 w-8 h-8 opacity-10 group-hover:opacity-20 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-full h-full text-current">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none">
                      <animateTransform attributeName="transform" type="rotate" values="0 12 12; 360 12 12" dur="8s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="12" cy="6" r="2" fill="currentColor">
                      <animateTransform attributeName="transform" type="rotate" values="0 12 12; 360 12 12" dur="8s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                </div>
                
                {getServiceIcon(product.name)}
                
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold bg-gradient-to-r from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 rounded-full border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300">
                    {product.category}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}