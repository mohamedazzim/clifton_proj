import { useState } from "react";
import { useLocation } from "wouter";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

import WhatsApp_Image_2025_06_23_at_15_47_14_b699984d_removebg_preview from "@assets/WhatsApp_Image_2025-06-23_at_15.47.14_b699984d-removebg-preview.png";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

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

  return (
    <nav className="fixed top-0 w-full z-50 px-5 sm:px-8 lg:px-10 pt-5 sm:pt-8">
      <div className="max-w-7xl mx-auto">
        <div className="noise-grid gradient-border glass rounded-2xl px-6 sm:px-10 py-5 backdrop-blur-xl bg-white/98 dark:bg-black/98 shadow-2xl border border-gray-200/50 dark:border-gray-800/50 pl-[30px] pr-[30px] pt-[12px] pb-[12px]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src={theme === 'light' ? "/images/logo/CLIFTON-BLACK.png" : "/images/logo/CLIFTON-WHITE.png"}
                  alt="CLIFTON Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-900 dark:text-white font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {t("nav.home")}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-900 dark:text-white font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {t("nav.about")}
              </button>
              <button 
                onClick={navigateToProducts}
                className="text-gray-900 dark:text-white font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {t("nav.products")}
              </button>

              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-900 dark:text-white font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {t("nav.contact")}
              </button>
            </div>

            {/* Language & Theme Toggle */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    language === 'en' 
                      ? 'bg-black dark:bg-white text-white dark:text-black' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('pt')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    language === 'pt' 
                      ? 'bg-black dark:bg-white text-white dark:text-black' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  PT
                </button>
              </div>
              
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
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
                className="md:hidden p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group text-gray-900 dark:text-white"
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
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="py-2 text-left text-gray-900 dark:text-white font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {t("nav.home")}
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="py-2 text-left text-gray-900 dark:text-white font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {t("nav.about")}
                </button>
                <button 
                  onClick={navigateToProducts}
                  className="py-2 text-left text-gray-900 dark:text-white font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {t("nav.products")}
                </button>

                <button 
                  onClick={() => scrollToSection('contact')}
                  className="py-2 text-left text-gray-900 dark:text-white font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
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
