import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

// Tesla-style custom CSS
const teslaStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  .tesla-font {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    letter-spacing: -0.01em;
  }
  
  .tesla-title {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  
  .tesla-subtitle {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    letter-spacing: -0.005em;
    line-height: 1.4;
  }
  
  .tesla-button {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    letter-spacing: 0.02em;
    text-transform: none;
    border-radius: 0;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .tesla-section {
    scroll-snap-align: start;
  }
`;

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
    <>
      <style dangerouslySetInnerHTML={{ __html: teslaStyles }} />
      <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth tesla-font">
        <Navigation />
      
      {/* Hero Section - Tesla Style */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="hero-bg absolute inset-0 w-full h-[120%] -top-[10%]">
          <img 
            src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Premium Textiles Manufacturing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="hero-title text-6xl md:text-8xl tesla-title mb-6 text-white">
            Premium Textiles
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl tesla-subtitle max-w-3xl mx-auto leading-relaxed text-white/90">
            Crafting the future of fashion with sustainable, innovative textile solutions
          </p>
          
          {/* Tesla-style CTA */}
          <div className="mt-16 space-y-4">
            <button className="tesla-button bg-white text-black px-16 py-4 text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
              Explore Collection
            </button>
            <button className="tesla-button block mx-auto bg-transparent border-2 border-white text-white px-16 py-4 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300">
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
      <section ref={textileSection1Ref} className="tesla-section h-screen flex items-center bg-white text-black">
        <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl tesla-title mb-8 text-black">
              Organic Cotton
            </h2>
            <p className="text-xl tesla-subtitle leading-relaxed mb-12 text-gray-700">
              Premium GOTS certified cotton fabrics sourced from sustainable farms worldwide. 
              Each thread tells a story of environmental responsibility and exceptional quality.
            </p>
            <div className="space-y-6 text-lg tesla-font">
              <div className="flex justify-between border-b border-gray-200 pb-4">
                <span className="text-gray-600">Trade Volume</span>
                <span className="font-medium text-black">50-500 MT</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-4">
                <span className="text-gray-600">Minimum Order</span>
                <span className="font-medium text-black">5 MT</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-4">
                <span className="text-gray-600">Certification</span>
                <span className="font-medium text-black">GOTS Certified</span>
              </div>
            </div>
          </div>
          <div className="relative h-96 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Organic Cotton Manufacturing"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Silk Products Section */}
      <section ref={textileSection2Ref} className="tesla-section h-screen flex items-center bg-gray-100">
        <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative h-96 overflow-hidden order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Luxury Silk Production"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-5xl md:text-6xl tesla-title mb-8 text-black">
              Luxury Silk
            </h2>
            <p className="text-xl tesla-subtitle leading-relaxed mb-12 text-gray-700">
              Grade A+ silk products from traditional silk-producing regions. 
              Combining centuries-old craftsmanship with modern sustainable practices.
            </p>
            <div className="space-y-6 text-lg tesla-font">
              <div className="flex justify-between border-b border-gray-300 pb-4">
                <span className="text-gray-600">Trade Volume</span>
                <span className="font-medium text-black">10-100 MT</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-4">
                <span className="text-gray-600">Minimum Order</span>
                <span className="font-medium text-black">1 MT</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-4">
                <span className="text-gray-600">Quality</span>
                <span className="font-medium text-black">Grade A+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Synthetic Fibers Section */}
      <section ref={textileSection3Ref} className="tesla-section h-screen flex items-center bg-black text-white">
        <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl tesla-title mb-8 text-white">
              Synthetic Innovation
            </h2>
            <p className="text-xl tesla-subtitle leading-relaxed mb-12 text-gray-300">
              Performance-enhanced synthetic textiles utilizing cutting-edge technology. 
              Designed for durability, functionality, and environmental responsibility.
            </p>
            <div className="space-y-6 text-lg tesla-font">
              <div className="flex justify-between border-b border-gray-700 pb-4">
                <span className="text-gray-400">Trade Volume</span>
                <span className="font-medium text-white">100-1,000 MT</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-4">
                <span className="text-gray-400">Minimum Order</span>
                <span className="font-medium text-white">10 MT</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-4">
                <span className="text-gray-400">Enhancement</span>
                <span className="font-medium text-white">Performance</span>
              </div>
            </div>
          </div>
          <div className="relative h-96 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Synthetic Fiber Technology"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="tesla-section h-screen flex items-center bg-white">
        <div className="w-full max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-5xl md:text-6xl tesla-title mb-20 text-black">
            Global Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-20">
            <div className="group">
              <div className="text-6xl md:text-7xl tesla-title mb-6 text-black group-hover:text-blue-600 transition-colors duration-300">
                <span className="stat-number">0</span>+
              </div>
              <p className="text-xl tesla-subtitle text-gray-600">Countries Served</p>
            </div>
            <div className="group">
              <div className="text-6xl md:text-7xl tesla-title mb-6 text-black group-hover:text-blue-600 transition-colors duration-300">
                <span className="stat-number">0</span>K
              </div>
              <p className="text-xl tesla-subtitle text-gray-600">Tons Traded</p>
            </div>
            <div className="group">
              <div className="text-6xl md:text-7xl tesla-title mb-6 text-black group-hover:text-blue-600 transition-colors duration-300">
                <span className="stat-number">0</span>%
              </div>
              <p className="text-xl tesla-subtitle text-gray-600">Sustainable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="tesla-section h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1567378711934-f5d68e2e5dd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Textile Innovation"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="text-center px-8 relative z-10">
          <h2 className="text-5xl md:text-6xl tesla-title mb-12 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl tesla-subtitle mb-16 max-w-3xl mx-auto text-gray-300">
            Partner with CLIFTON for premium textile solutions that drive your business forward
          </p>
          <button 
            onClick={() => window.location.href = '/#contact'}
            className="tesla-button bg-white text-black px-20 py-6 text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default TeslaStyleTextiles;