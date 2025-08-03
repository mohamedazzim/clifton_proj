import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BackToTopButton } from '@/components/BackToTopButton';

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
    // Immediate state setting for smooth performance
    gsap.set('.hero-title', { y: 40, opacity: 0 });
    gsap.set('.hero-subtitle', { y: 30, opacity: 0 });

    // Create master timeline for coordinated animations
    const masterTimeline = gsap.timeline({ delay: 0.2 });

    // Hero entrance sequence - faster and smoother
    masterTimeline
      .to('.hero-title', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');

    // Optimized parallax with reduced impact
    const parallaxTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.to('.hero-bg', {
          yPercent: -10 * self.progress,
          duration: 0.1,
          ease: 'none'
        });
      }
    });

    // Efficient section animations with batch processing
    const sectionRefs = [textileSection1Ref, textileSection2Ref, textileSection3Ref];
    const sectionTriggers = sectionRefs.map((ref) => {
      if (!ref.current) return null;

      gsap.set(ref.current, { y: 40, opacity: 0 });

      return ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(ref.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    }).filter(Boolean);

    // Optimized stats counter
    const statsElements = statsRef.current?.querySelectorAll('.stat-number');
    let statsTrigger = null;

    if (statsElements && statsElements.length > 0) {
      statsTrigger = ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          statsElements.forEach((stat, index) => {
            const finalValues = [50, 100, 100];
            const suffixes = ['+', 'K', '%'];
            
            gsap.fromTo(stat, 
              { innerHTML: 0 },
              {
                innerHTML: finalValues[index],
                duration: 1.5,
                ease: 'power2.out',
                snap: { innerHTML: 1 },
                onUpdate: function() {
                  const currentValue = Math.round(this.targets()[0].innerHTML);
                  stat.innerHTML = currentValue + suffixes[index];
                }
              }
            );
          });
        }
      });
    }

    // Cleanup function
    return () => {
      masterTimeline.kill();
      parallaxTrigger.kill();
      sectionTriggers.forEach(trigger => trigger?.kill());
      statsTrigger?.kill();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: teslaStyles }} />
      <div className="min-h-screen bg-white text-black overflow-x-hidden scroll-smooth tesla-font">
        <Navigation />
      
      {/* Hero Section - Tesla Style */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
        {/* Background Video/Image */}
        <div className="hero-bg absolute inset-0 w-full h-[120%] -top-[10%]">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Premium Textile Factory with Modern Equipment"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="hero-title text-6xl md:text-8xl tesla-title mb-6 text-gray-900">
            Premium Textiles
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl tesla-subtitle max-w-3xl mx-auto leading-relaxed text-gray-700">
            Crafting the future of fashion with sustainable, innovative textile solutions
          </p>
          
          {/* Tesla-style CTA */}
          <div className="mt-16 space-y-4">
            <button className="tesla-button bg-gray-900 text-white px-16 py-4 text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
              Explore Collection
            </button>
            <button className="tesla-button block mx-auto bg-transparent border-2 border-gray-900 text-gray-900 px-16 py-4 text-lg font-medium hover:bg-gray-900 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-900 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-900 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Cotton Fabrics Section */}
      <section ref={textileSection1Ref} className="section-1 tesla-section h-screen flex items-center bg-white text-black">
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
              src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Organic Cotton Fields and Processing"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Silk Products Section */}
      <section ref={textileSection2Ref} className="section-2 tesla-section h-screen flex items-center bg-gray-100">
        <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative h-96 overflow-hidden order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Luxury Silk Weaving and Production Process"
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
      <section ref={textileSection3Ref} className="section-3 tesla-section h-screen flex items-center bg-gray-50 text-black">
        <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl tesla-title mb-8 text-gray-900">
              Textile Innovation
            </h2>
            <p className="text-xl tesla-subtitle leading-relaxed mb-12 text-gray-700">
              Performance-enhanced synthetic textiles utilizing cutting-edge technology. 
              Designed for durability, functionality, and environmental responsibility.
            </p>
            <div className="space-y-6 text-lg tesla-font">
              <div className="flex justify-between border-b border-gray-300 pb-4">
                <span className="text-gray-600">Trade Volume</span>
                <span className="font-medium text-gray-900">100-1,000 MT</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-4">
                <span className="text-gray-600">Minimum Order</span>
                <span className="font-medium text-gray-900">10 MT</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-4">
                <span className="text-gray-600">Enhancement</span>
                <span className="font-medium text-gray-900">Performance</span>
              </div>
            </div>
          </div>
          <div className="relative h-96 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Advanced Synthetic Textile Innovation Lab"
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
      <section className="tesla-section h-screen flex items-center justify-center bg-gray-100 text-black relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Global Textile Trade and Business Partnership"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="text-center px-8 relative z-10">
          <h2 className="text-5xl md:text-6xl tesla-title mb-12 text-gray-900">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl tesla-subtitle mb-16 max-w-3xl mx-auto text-gray-700">
            Partner with CLIFTON for premium textile solutions that drive your business forward
          </p>
          <button 
            onClick={() => window.location.href = '/#contact'}
            className="tesla-button bg-gray-900 text-white px-20 py-6 text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      <Footer />
      <BackToTopButton />
      </div>
    </>
  );
};

export default TeslaStyleTextiles;