import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { useTheme } from '../components/ThemeProvider';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProductsThreeBackground } from '../components/ProductsThreeBackground';
import { LoadingScreen } from '../components/LoadingScreen';

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
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Product details data
  const productDetails = {
    'Coffee': {
      title: 'Premium Coffee',
      description: 'Premium quality coffee beans sourced from the finest farms worldwide',
      detailedDescription: 'Our coffee selection includes arabica and robusta varieties from certified sustainable farms across Ethiopia, Colombia, Brazil, and Central America. We ensure fair trade practices and maintain strict quality control from farm to export.',
      specifications: ['Grade A arabica beans', 'Moisture content: 8-12%', 'Screen size: 15-18', 'Processing: Washed and natural'],
      origins: ['Ethiopia', 'Colombia', 'Brazil', 'Guatemala'],
      certifications: ['Fair Trade', 'Organic', 'UTZ Certified']
    },
    'Salt': {
      title: 'Industrial & Food Grade Salt',
      description: 'High-grade industrial and food-grade salt for various applications',
      detailedDescription: 'We supply premium quality salt products including sea salt, rock salt, and refined salt for industrial and food applications. Our salt meets international purity standards and is available in various grades and packaging options.',
      specifications: ['Purity: 99.5%+', 'Moisture: <0.5%', 'Particle size: Various grades', 'Food grade certified'],
      origins: ['Mediterranean Sea', 'Dead Sea', 'Himalayan Mines'],
      certifications: ['ISO 9001', 'HACCP', 'FDA Approved']
    },
    'Sugar': {
      title: 'Refined & Raw Sugar',
      description: 'Refined and raw sugar varieties meeting international quality standards',
      detailedDescription: 'Our sugar portfolio includes refined white sugar, raw sugar, and specialty sugars sourced from top sugar-producing regions. We maintain strict quality control and offer competitive pricing for bulk quantities. Detailed description will be updated soon.',
      specifications: ['Polarization: 99.8° min', 'Moisture: 0.04% max', 'Ash content: 0.04% max', 'ICUMSA 45 rating'],
      origins: ['Brazil', 'Thailand', 'India', 'Australia'],
      certifications: ['ISO 22000', 'Kosher', 'Halal']
    },
    'Soybeans': {
      title: 'Sustainable Soybeans',
      description: 'Sustainable soybean products for food and industrial applications',
      detailedDescription: 'We offer high-quality soybeans for various applications including animal feed, oil extraction, and food processing. Our soybeans are sourced from certified sustainable farms with full traceability.',
      specifications: ['Protein content: 34-38%', 'Oil content: 18-20%', 'Moisture: 13% max', 'GMO and non-GMO varieties'],
      origins: ['Brazil', 'Argentina', 'USA', 'Ukraine'],
      certifications: ['RTRS Certified', 'Non-GMO Project', 'ISCC Plus']
    },
    'Corn': {
      title: 'Premium Corn (Maize)',
      description: 'Premium quality corn sourced from certified farms worldwide',
      detailedDescription: 'Corn, also known as maize, is one of the world\'s most vital staple crops, integral to global food security and agricultural economies. As a versatile grain, corn serves diverse purposes—from human consumption and animal feed to industrial applications such as biofuel production.\n\nOur company specializes in the export of high-quality corn, connecting farmers and producers with markets worldwide. We prioritize sourcing corn that meets international standards for purity, moisture content, and quality, ensuring our clients receive products that adhere to strict regulations and customer specifications.\n\nWith extensive logistics networks and advanced supply chain management, we facilitate seamless trade, ensuring timely delivery across continents. We are committed to sustainable and traceable sourcing practices, supporting farmers who use environmentally responsible cultivation methods.\n\nWhether you seek bulk shipments for large-scale industrial use or quality corn for retail, our expertise and global reach enable us to provide tailored solutions that meet your business needs. Trust us to be your reliable partner in navigating the dynamic landscape of corn trade internationally.',
      specifications: ['Moisture content: 14% max', 'Foreign matter: 2% max', 'Broken kernels: 5% max', 'Test weight: 56 lbs/bushel min'],
      origins: ['USA', 'Brazil', 'Argentina', 'Ukraine'],
      certifications: ['Non-GMO Project', 'Organic', 'Feed Grade', 'Food Grade']
    }
  };

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
    consumer_electronics: {
      title: 'Consumer Electronics',
      subtitle: 'High-quality electronic devices and components for global markets',
      backgroundImages: [
        '/images/products/coffee.jpg',
        '/images/products/salt.jpeg',
        '/images/products/sugar.jpg'
      ],
      products: []
    },
    textiles_fashion: {
      title: 'Textiles & Fashion',
      subtitle: 'Quality fabrics, garments, and fashion accessories for international trade',
      backgroundImages: [
        '/images/products/coffee.jpg',
        '/images/products/salt.jpeg',
        '/images/products/sugar.jpg'
      ],
      products: []
    },
    automotive_components: {
      title: 'Automotive Components',
      subtitle: 'Reliable automotive parts and components for the global automotive industry',
      backgroundImages: [
        '/images/products/coffee.jpg',
        '/images/products/salt.jpeg',
        '/images/products/sugar.jpg'
      ],
      products: []
    }
  };

  const currentCategory = categoryConfig[category as keyof typeof categoryConfig];

  // Modal handlers
  const openModal = (product: any) => {
    const details = productDetails[product.name as keyof typeof productDetails];
    if (details) {
      setSelectedProduct({ ...product, ...details });
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

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
  
  // Show "Will be updated soon" for all categories except agriculture_product
  if (category !== 'agriculture_product') {
    const categoryTitles = {
      consumer_electronics: 'Consumer Electronics',
      textiles_fashion: 'Textiles & Fashion', 
      automotive_components: 'Automotive Components'
    };
    
    const pageTitle = categoryTitles[category as keyof typeof categoryTitles] || 'Product Category';
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black relative overflow-hidden">
        <ProductsThreeBackground />
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-5 sm:px-8 lg:px-10 min-h-[60vh] flex items-center">
          <div className="max-w-7xl mx-auto text-center w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
              {pageTitle}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Coming Soon
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
                  Will Be Updated Soon
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  We're working hard to bring you detailed information about this product category. 
                  Our team is preparing comprehensive content including product specifications, 
                  pricing information, and trade volumes.
                </p>
              </div>
              
              <div className="space-y-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                  Notify Me When Available
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified when this product category becomes available
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Only agriculture_product will reach this point and show full content
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black relative overflow-hidden">
        <ProductsThreeBackground />
        <Navigation />
        <div className="pt-32 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Product category not found
          </h1>
        </div>
        <Footer />
      </div>
    );
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
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${currentCategory.backgroundImages[currentImageIndex]})`
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto text-center relative z-20 w-full">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 text-white drop-shadow-2xl">
              {currentCategory.title}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-lg">
              {currentCategory.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group noise-grid gradient-border glass px-8 py-4 rounded-xl text-white hover-scale transition-all duration-500 font-semibold text-lg relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="relative z-10">Request Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
              <button className="group bg-white text-black px-8 py-4 rounded-xl hover-scale transition-all duration-500 font-semibold text-lg border-2 border-transparent hover:border-white/20 relative overflow-hidden">
                <span className="relative z-10">View Catalog</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
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
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our {currentCategory.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
              Discover our comprehensive range of high-quality products with competitive pricing and reliable supply chains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentCategory.products.map((product, index) => (
              <div
                key={product.name}
                className="group relative noise-grid gradient-border glass rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-600/30"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)'
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
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200/30 dark:border-gray-700/30">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Trade Volume</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{product.tradeVolume}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Min Order</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{product.minOrder}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 relative z-10">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('View Details clicked for:', product.name);
                        openModal(product);
                      }}
                      className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:from-gray-700 hover:to-gray-900 cursor-pointer"
                    >
                      View Details
                    </button>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      Request Quote
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
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto noise-grid gradient-border glass rounded-3xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Product Image */}
                  <div className="lg:w-1/3">
                    <div className="aspect-square overflow-hidden rounded-2xl">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="lg:w-2/3">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {selectedProduct.title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    
                    {/* Trade Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Trade Volume</h4>
                        <p className="text-gray-600 dark:text-gray-400">{selectedProduct.tradeVolume}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Minimum Order</h4>
                        <p className="text-gray-600 dark:text-gray-400">{selectedProduct.minOrder}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Product</h3>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {selectedProduct.detailedDescription.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Specifications</h4>
                  <ul className="space-y-2">
                    {selectedProduct.specifications?.map((spec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 dark:text-gray-400">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Origins</h4>
                  <ul className="space-y-2">
                    {selectedProduct.origins?.map((origin: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 dark:text-gray-400">{origin}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Certifications</h4>
                  <ul className="space-y-2">
                    {selectedProduct.certifications?.map((cert: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 dark:text-gray-400">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  Request Quote
                </button>
                <button className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  Download Specifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductCategory;