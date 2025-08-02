import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TeslaStyleTextiles: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textileSection1Ref = useRef<HTMLDivElement>(null);
  const textileSection2Ref = useRef<HTMLDivElement>(null);
  const textileSection3Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    gsap.fromTo(
      '.hero-title',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-subtitle',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' }
    );

    // Parallax background effect
    gsap.to('.hero-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Section fade-in animations
    const sections = [textileSection1Ref, textileSection2Ref, textileSection3Ref];
    
    sections.forEach((sectionRef, index) => {
      gsap.fromTo(
        sectionRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Stats counter animation
    gsap.fromTo(
      '.stat-number',
      { textContent: 0 },
      {
        textContent: 100,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section - Tesla Style */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="hero-bg absolute inset-0 w-full h-[120%] -top-[10%]">
          <img 
            src="/images/products/agricultural/coffee.jpg" 
            alt="Premium Textiles"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="hero-title text-6xl md:text-8xl font-light tracking-wide mb-6">
            Premium Textiles
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Crafting the future of fashion with sustainable, innovative textile solutions
          </p>
          
          {/* Tesla-style CTA */}
          <div className="mt-12 space-y-4">
            <button className="bg-white text-black px-12 py-4 text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Explore Collection
            </button>
            <button className="block mx-auto bg-transparent border-2 border-white text-white px-12 py-4 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Cotton Fabrics Section */}
      <section ref={textileSection1Ref} className="h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-light mb-8">
              Organic Cotton
            </h2>
            <p className="text-xl font-light leading-relaxed mb-8 text-gray-300">
              Premium GOTS certified cotton fabrics sourced from sustainable farms worldwide. 
              Each thread tells a story of environmental responsibility and exceptional quality.
            </p>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>Trade Volume</span>
                <span className="font-medium">50-500 MT</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Order</span>
                <span className="font-medium">5 MT</span>
              </div>
              <div className="flex justify-between">
                <span>Certification</span>
                <span className="font-medium">GOTS Certified</span>
              </div>
            </div>
          </div>
          <div className="relative h-96 overflow-hidden rounded-lg">
            <img 
              src="/images/products/agricultural/coffee.jpg" 
              alt="Cotton Fabrics"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Silk Products Section */}
      <section ref={textileSection2Ref} className="h-screen flex items-center bg-gray-900">
        <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-96 overflow-hidden rounded-lg order-2 md:order-1">
            <img 
              src="/images/products/agricultural/salt.jpg" 
              alt="Luxury Silk"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-5xl md:text-6xl font-light mb-8">
              Luxury Silk
            </h2>
            <p className="text-xl font-light leading-relaxed mb-8 text-gray-300">
              Grade A+ silk products from traditional silk-producing regions. 
              Combining centuries-old craftsmanship with modern sustainable practices.
            </p>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>Trade Volume</span>
                <span className="font-medium">10-100 MT</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Order</span>
                <span className="font-medium">1 MT</span>
              </div>
              <div className="flex justify-between">
                <span>Quality</span>
                <span className="font-medium">Grade A+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Synthetic Fibers Section */}
      <section ref={textileSection3Ref} className="h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-light mb-8">
              Synthetic Innovation
            </h2>
            <p className="text-xl font-light leading-relaxed mb-8 text-gray-300">
              Performance-enhanced synthetic textiles utilizing cutting-edge technology. 
              Designed for durability, functionality, and environmental responsibility.
            </p>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>Trade Volume</span>
                <span className="font-medium">100-1,000 MT</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Order</span>
                <span className="font-medium">10 MT</span>
              </div>
              <div className="flex justify-between">
                <span>Enhancement</span>
                <span className="font-medium">Performance</span>
              </div>
            </div>
          </div>
          <div className="relative h-96 overflow-hidden rounded-lg">
            <img 
              src="/images/products/agricultural/soybeans.jpg" 
              alt="Synthetic Fibers"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="h-screen flex items-center bg-gray-950">
        <div className="w-full max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-16">
            Global Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <div className="text-6xl md:text-7xl font-light mb-4">
                <span className="stat-number">0</span>+
              </div>
              <p className="text-xl font-light text-gray-300">Countries Served</p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-light mb-4">
                <span className="stat-number">0</span>K
              </div>
              <p className="text-xl font-light text-gray-300">Tons Traded</p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-light mb-4">
                <span className="stat-number">0</span>%
              </div>
              <p className="text-xl font-light text-gray-300">Sustainable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="h-screen flex items-center justify-center bg-white text-black">
        <div className="text-center px-8">
          <h2 className="text-5xl md:text-6xl font-light mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl font-light mb-12 max-w-3xl mx-auto">
            Partner with CLIFTON for premium textile solutions that drive your business forward
          </p>
          <button 
            onClick={() => window.location.href = '/#contact'}
            className="bg-black text-white px-16 py-6 text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeslaStyleTextiles;