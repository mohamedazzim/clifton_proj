import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { gsap } from 'gsap';



export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  // GSAP Navigation entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Set initial states
    gsap.set('.nav-container', { y: -100, opacity: 0 });
    gsap.set('.nav-logo', { scale: 0.8, opacity: 0, rotateY: -90 });
    gsap.set('.nav-item', { y: -30, opacity: 0 });
    gsap.set('.nav-controls', { x: 50, opacity: 0 });

    // Animate navigation entrance
    tl.to('.nav-container', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to('.nav-logo', {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.4')
    .to('.nav-item', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.3')
    .to('.nav-controls', {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    if (location !== '/') {
      setLocation('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToProducts = () => {
    setLocation('/products');
    setIsMobileMenuOpen(false);
    // Scroll to top when navigating to products page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navigateToAbout = () => {
    setLocation('/about');
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navigateToContact = () => {
    setLocation('/contact');
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav ref={navRef} className="w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6" style={{ position: 'static' }}>
      <div className="max-w-7xl mx-auto">
        <div className="nav-container rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 glass glass-enhanced backdrop-blur-xl shadow-2xl border border-white/20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div ref={logoRef} className="nav-logo w-16 h-16 flex items-center justify-center">
                <img 
                  src="/images/logo/CLIFTON-BLACK.png"
                  alt="CLIFTON Logo" 
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div ref={menuItemsRef} className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="nav-item text-gray-900 font-bold hover:text-gray-600 transition-all duration-300 relative group"
              >
                {t("nav.home")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={navigateToAbout}
                className="nav-item text-gray-900 font-bold hover:text-gray-600 transition-all duration-300 relative group"
              >
                {t("nav.about")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={navigateToProducts}
                className="nav-item text-gray-900 font-bold hover:text-gray-600 transition-all duration-300 relative group"
              >
                {t("nav.products")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </button>

              <button 
                onClick={navigateToContact}
                className="nav-item text-gray-900 font-bold hover:text-gray-600 transition-all duration-300 relative group"
              >
                {t("nav.contact")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>

            {/* Language & Theme Toggle */}
            <div className="nav-controls flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    language === 'en' 
                      ? 'bg-black text-white' 
                      : 'hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('pt')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    language === 'pt' 
                      ? 'bg-black text-white' 
                      : 'hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  PT
                </button>
              </div>
              
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
              >
                {theme === 'light' ? (
                  <i className="fas fa-moon"></i>
                ) : (
                  <i className="fas fa-sun"></i>
                )}
              </button>

              {/* Mobile Menu Button with Animation */}
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 group text-gray-900"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'group-hover:w-8'
                  }`}></span>
                  <span className={`block h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 w-6' : 'w-4 group-hover:w-6'
                  }`}></span>
                  <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'group-hover:w-8'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="py-2 text-left text-gray-900 font-bold hover:text-gray-600 transition-colors"
                >
                  {t("nav.home")}
                </button>
                <button 
                  onClick={navigateToAbout}
                  className="py-2 text-left text-gray-900 font-bold hover:text-gray-600 transition-colors"
                >
                  {t("nav.about")}
                </button>
                <button 
                  onClick={navigateToProducts}
                  className="py-2 text-left text-gray-900 font-bold hover:text-gray-600 transition-colors"
                >
                  {t("nav.products")}
                </button>

                <button 
                  onClick={navigateToContact}
                  className="py-2 text-left text-gray-900 font-bold hover:text-gray-600 transition-colors"
                >
                  {t("nav.contact")}
                </button>
                <div className="flex items-center space-x-2 py-2">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      language === 'en' 
                        ? 'bg-black dark:bg-white text-white dark:text-black' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setLanguage('pt')}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      language === 'pt' 
                        ? 'bg-black dark:bg-white text-white dark:text-black' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    PT
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
