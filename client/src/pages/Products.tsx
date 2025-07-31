import React, { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { useLanguage } from '../components/LanguageProvider';
import { useTheme } from '../components/ThemeProvider';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProductsThreeBackground } from '../components/ProductsThreeBackground';
import { LoadingScreen } from '../components/LoadingScreen';

const Products = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Background images for sliding effect
  const backgroundImages = [
    '/images/products/agriculture-cattle.jpg',
    '/images/products/consumer-electronics.jpg',
    '/images/products/textiles_and_fashion.jpg',
    '/images/products/automotive.jpg'
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [slideDirection, setSlideDirection] = useState('translate-x-0');

  useEffect(() => {
    // Simulate loading time and hide navigation until loaded
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const interval = setInterval(() => {
      // Start fade out and slide effect
      setFadeClass('opacity-0');
      setSlideDirection('translate-x-full');
      
      setTimeout(() => {
        // Change image
        setCurrentImageIndex((prevIndex) => 
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
        
        // Reset position and start fade in
        setSlideDirection('-translate-x-full');
        setTimeout(() => {
          setFadeClass('opacity-100');
          setSlideDirection('translate-x-0');
        }, 100);
      }, 500);
    }, 4000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, [backgroundImages.length]);

  const products = [
    {
      name: 'Agricultural Products',
      slug: 'agriculture_product',
      image: '/images/products/agriculture-cattle.jpg',
      gradient: 'from-green-600 to-green-800',
      description: 'Premium agricultural commodities including coffee, salt, sugar, and soybeans'
    },
    {
      name: 'Consumer Electronics',
      slug: 'consumer_electronics',
      image: '/images/products/consumer-electronics.jpg',
      gradient: 'from-blue-600 to-blue-800',
      description: 'High-quality electronic devices and components for global markets'
    },
    
    {
      name: 'Textiles & Fashion',
      slug: 'textiles_fashion',
      image: '/images/products/textiles_and_fashion.jpg',
      gradient: 'from-purple-600 to-purple-800',
      description: 'Quality fabrics, garments, and fashion accessories for international trade'
    },
    {
      name: 'Automotive Components',
      slug: 'automotive_components',
      image: '/images/products/automotive.jpg',
      gradient: 'from-red-600 to-red-800',
      description: 'Reliable automotive parts and components for the global automotive industry'
    }
  ];

  const handleProductClick = (productSlug: string) => {
    console.log('Products page - Product card clicked:', productSlug);
    console.log('Products page - Navigating to:', `/products/${productSlug}`);
    setLocation(`/products/${productSlug}`);
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const benefits = [
    {
      icon: '🏆',
      title: 'Quality Certified',
      description: 'International quality standards with full traceability'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Efficient logistics and timely global shipping'
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description: 'Market-leading prices with flexible payment terms'
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Worldwide network of trusted suppliers and partners'
    }
  ];

  const commitments = [
    'Sourcing from verified and sustainable farms',
    'Comprehensive quality testing and certification',
    'Transparent pricing with no hidden costs',
    '24/7 customer support and order tracking'
  ];

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} duration={1000} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black relative overflow-hidden">
      <ProductsThreeBackground />
      <Navigation />
      
      {/* Hero Section with Sliding Background */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 lg:px-10 min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Images */}
        <div className="absolute inset-0 z-0">
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${fadeClass} ${slideDirection}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${backgroundImages[currentImageIndex]})`
            }}
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto text-center relative z-20 w-full">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 text-white drop-shadow-2xl">
              Premium Commodities
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-lg">
              Discover our range of high-quality agricultural commodities, sourced from trusted global suppliers and delivered with excellence.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group noise-grid gradient-border glass px-8 py-4 rounded-xl text-white hover-scale transition-all duration-500 font-semibold text-lg relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="relative z-10">Explore Our Range</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
              <button className="group bg-white text-black px-8 py-4 rounded-xl hover-scale transition-all duration-500 font-semibold text-lg border-2 border-transparent hover:border-white/20 relative overflow-hidden">
                <span className="relative z-10">Request Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div
                key={product.name}
                onClick={(e) => {
                  e.preventDefault();
                  handleProductClick(product.slug);
                }}
                className="group relative noise-grid gradient-border glass rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-600/30 cursor-pointer"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)',
                  pointerEvents: 'auto'
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
                  {/* Category Badge */}
                  <span className="inline-block text-xs text-gray-500 dark:text-gray-400 bg-gray-100/70 dark:bg-gray-700/70 px-3 py-1 rounded-full backdrop-blur-sm mb-3">
                    {product.name.split(' ')[0]}
                  </span>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.slug);
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 dark:bg-gray-700/10 dark:hover:bg-gray-600/20 backdrop-blur-md border border-white/20 dark:border-gray-600/20 text-gray-900 dark:text-white py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Learn More
                  </button>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-all duration-500">
                  <svg viewBox="0 0 24 24" className="w-full h-full text-current">
                    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="1" fill="none">
                      <animateTransform attributeName="transform" type="rotate" values="0 12 12; 360 12 12" dur="15s" repeatCount="indefinite"/>
                    </polygon>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CLIFTON Section */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Why Choose CLIFTON for Your Commodity Needs?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
              With decades of experience in international trade, we ensure the highest quality standards, competitive pricing, and reliable supply chains for all your agricultural commodity requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group noise-grid gradient-border glass rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-10 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Commitment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {commitments.map((commitment, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-6 noise-grid gradient-border glass rounded-xl hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{commitment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Information Section */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Trade Volumes */}
            <div className="noise-grid gradient-border glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Trade Volumes</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Minimum Order</span>
                  <span className="font-bold text-gray-900 dark:text-white">25 MT</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Standard Containers</span>
                  <span className="font-bold text-gray-900 dark:text-white">20ft & 40ft FCL</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Bulk Shipments</span>
                  <span className="font-bold text-gray-900 dark:text-white">Up to 50,000 MT</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 dark:text-gray-400">Payment Terms</span>
                  <span className="font-bold text-gray-900 dark:text-white">LC, TT, DP</span>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="noise-grid gradient-border glass rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to discuss your commodity requirements?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Our trade specialists are here to help.
              </p>
              
              <div className="space-y-4">
                <button className="w-full bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  Request Quote
                </button>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    <strong>Call us:</strong> +34 123 456 789
                  </p>
                  <p>
                    <strong>Email:</strong> trade@cliftontraders.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;