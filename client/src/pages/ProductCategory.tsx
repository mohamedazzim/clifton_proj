import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '../components/LanguageProvider';
import { useTheme } from '../components/ThemeProvider';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProductsThreeBackground } from '../components/ProductsThreeBackground';
import { LoadingScreen } from '../components/LoadingScreen';
import { BackToTopButton } from '../components/BackToTopButton';

interface ProductCategoryProps {
  category: string;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ category }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [slideDirection, setSlideDirection] = useState('translate-x-0');
  const [, setLocation] = useLocation();

  // Product category configurations
  const categoryConfig = {
    agriculture_product: {
      title: 'Agricultural Products',
      subtitle: 'Premium quality agricultural commodities sourced from trusted global suppliers',
      backgroundImages: [
        '/images/products/agricultural/soye.jpg',
        '/images/products/agricultural/salt.jpeg',
        '/images/products/agricultural/sugar.jpg'
      ],
      products: [
        {
          name: 'Coffee',
          image: '/images/products/agricultural/coffee.jpg',
          gradient: 'from-amber-600 to-amber-800',
          description: 'Premium quality coffee beans sourced from the finest farms worldwide',
          tradeVolume: '500-5,000 MT',
          minOrder: '25 MT'
        },
        {
          name: 'Salt',
          image: '/images/products/agricultural/salt.jpeg',
          gradient: 'from-blue-600 to-blue-800',
          description: 'High-grade industrial and food-grade salt for various applications',
          tradeVolume: '1,000-10,000 MT',
          minOrder: '50 MT'
        },
        {
          name: 'Sugar',
          image: '/images/products/agricultural/sugar.jpg',
          gradient: 'from-pink-600 to-pink-800',
          description: 'Refined and raw sugar varieties meeting international quality standards',
          tradeVolume: '2,000-25,000 MT',
          minOrder: '100 MT'
        },
        {
          name: 'Soybeans',
          image: '/images/products/agricultural/soye.jpg',
          gradient: 'from-green-600 to-green-800',
          description: 'Sustainable soybean products for food and industrial applications',
          tradeVolume: '1,500-15,000 MT',
          minOrder: '75 MT'
        },
        {
          name: 'Corn',
          image: '/images/products/agricultural/sugar.jpg',
          gradient: 'from-yellow-600 to-yellow-800',
          description: 'Premium quality corn sourced from certified farms worldwide',
          tradeVolume: '2,000-20,000 MT',
          minOrder: '100 MT'
        }
      ]
    },
    textiles_fashion: {
      title: 'Premium Textiles',
      subtitle: 'Crafting the future of fashion with sustainable, innovative textile solutions',
      backgroundImages: [
        'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
      ],
      products: [
        {
          name: 'Organic Cotton',
          image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          gradient: 'from-green-600 to-emerald-800',
          description: 'GOTS certified organic cotton fabrics from sustainable farms, perfect for eco-conscious fashion brands',
          tradeVolume: '50-500 MT',
          minOrder: '5 MT'
        },
        {
          name: 'Luxury Silk',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          gradient: 'from-purple-600 to-pink-800',
          description: 'Grade A+ luxury silk fabrics sourced from traditional silk-producing regions with centuries of expertise',
          tradeVolume: '10-100 MT',
          minOrder: '1 MT'
        },
        {
          name: 'Textile Innovation',
          image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          gradient: 'from-blue-600 to-cyan-800',
          description: 'Performance-enhanced synthetic fibers with advanced moisture-wicking and durability properties for modern applications',
          tradeVolume: '100-1,000 MT',
          minOrder: '10 MT'
        },
        {
          name: 'Fashion Accessories',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          gradient: 'from-amber-600 to-orange-800',
          description: 'Premium fashion accessories including leather goods, jewelry components, and textile-based accessories for global brands',
          tradeVolume: '5-50 MT',
          minOrder: '500 kg'
        }
      ]
    }
  };

  const currentCategory = categoryConfig[category as keyof typeof categoryConfig];

  // Navigate to individual product page
  const navigateToProductDetail = (productName: string) => {
    const productSlug = productName.toLowerCase().replace(/\s+/g, '');
    console.log('Navigating to product:', productSlug);
    setLocation(`/products/${category}/${productSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add loading effect for all category pages
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Background image animation for agriculture_product
  useEffect(() => {
    if (category === 'agriculture_product' && currentCategory) {
      const interval = setInterval(() => {
        setFadeClass('opacity-0');
        setSlideDirection('translate-x-full');
        
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => 
            prevIndex === currentCategory.backgroundImages.length - 1 ? 0 : prevIndex + 1
          );
          
          setSlideDirection('-translate-x-full');
          setTimeout(() => {
            setFadeClass('opacity-100');
            setSlideDirection('translate-x-0');
          }, 100);
        }, 500);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [category, currentCategory?.backgroundImages.length]);

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} duration={1000} />;
  }
  
  // Show "Will be updated soon" for categories without products (none currently)
  if (category !== 'agriculture_product' && category !== 'textiles_fashion') {
    const categoryTitles = {
      textiles_fashion: 'Textiles & Fashion'
    };
    
    const pageTitle = categoryTitles[category as keyof typeof categoryTitles] || 'Product Category';
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ProductsThreeBackground />
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-5 sm:px-8 lg:px-10 min-h-[60vh] flex items-center">
          <div className="max-w-7xl mx-auto text-center w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              {pageTitle}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("productCategory.comingSoon")}
            </p>
          </div>
        </section>

        {/* Update Soon Message Box */}
        <section className="relative py-20 px-5 sm:px-8 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="noise-grid gradient-border glass rounded-3xl p-12 text-center bg-white/10 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("productCategory.willBeUpdatedSoon")}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {t("productCategory.workingHard")} {t("productCategory.preparingContent")}
                </p>
              </div>
              
              <div className="space-y-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                  {t("productCategory.notifyMe")}
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("productCategory.getNotified")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <BackToTopButton />
      </div>
    );
  }

  // Only agriculture_product will reach this point and show full content
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ProductsThreeBackground />
        <Navigation />
        <div className="pt-32 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Product category not found
          </h1>
        </div>
        <Footer />
        <BackToTopButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ProductsThreeBackground />
      <Navigation />
      
      {/* Hero Section with Sliding Background */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 lg:px-10 min-h-screen flex items-center overflow-hidden">
        {/* Tesla-Style White Background */}
        <div className="absolute inset-0 z-0 bg-white">
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${fadeClass} ${slideDirection} opacity-30`}
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98)), url(${currentCategory.backgroundImages[currentImageIndex]})`
            }}
          />
          
          <div className="absolute inset-0 bg-white/40 z-10"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto text-center relative z-20 w-full">
          <div className="animate-slide-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 text-gray-900 drop-shadow-sm px-4 sm:px-0">
              {currentCategory.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed px-4 sm:px-0">
              {currentCategory.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4 sm:px-0">
              <button className="group bg-gray-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover-scale transition-all duration-500 font-semibold text-base md:text-lg border-2 border-transparent hover:border-gray-700 relative overflow-hidden">
                <span className="relative z-10">{t("productCategory.viewCatalog")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 transform skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {currentCategory.backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-gray-900 scale-125' 
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
              {t("productCategory.ourProducts").replace("{category}", currentCategory.title)}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
              {t("productCategory.discoverRange")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {currentCategory.products.map((product, index) => {
              // Special styling for Textile Innovation section
              const isTextileInnovation = product.name === 'Textile Innovation';
              const cardBgClass = isTextileInnovation 
                ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30' 
                : 'bg-white dark:bg-gray-800/20';
              const borderClass = isTextileInnovation
                ? 'border-blue-200 dark:border-blue-600/40'
                : 'border-gray-200 dark:border-gray-600/30';
              
              return (
              <div
                key={product.name}
                className={`group relative rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02] ${cardBgClass} border ${borderClass}`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  boxShadow: isTextileInnovation 
                    ? '0 8px 25px rgba(59, 130, 246, 0.08), 0 4px 10px rgba(59, 130, 246, 0.05)'
                    : '0 4px 15px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)'
                }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>
                
                {/* Product Image with rounded corners */}
                <div className="p-6 pb-0">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6 pt-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                  
                  <div className="space-y-3 relative z-10">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('View Details clicked for:', product.name);
                        navigateToProductDetail(product.name);
                      }}
                      className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:from-gray-700 hover:to-gray-900 cursor-pointer"
                    >
                      {t("productCategory.viewDetails")}
                    </button>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-all duration-500 pointer-events-none">
                  <svg viewBox="0 0 24 24" className="w-full h-full text-current">
                    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="1" fill="none">
                      <animateTransform attributeName="transform" type="rotate" values="0 12 12; 360 12 12" dur="15s" repeatCount="indefinite"/>
                    </polygon>
                  </svg>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>



      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default ProductCategory;