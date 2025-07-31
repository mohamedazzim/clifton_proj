import { useLocation } from "wouter";
import { useLanguage } from "./LanguageProvider";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface ProductItem {
  name: string;
  description: string;
  image: string;
  category: string;
  buttonText: string;
  slug: string;
}

export function ModernProducts() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  const products: ProductItem[] = [
    {
      name: "Agricultural Products", 
      description: "Premium agricultural products and specialty foods from Spain to global markets.",
      image: "/images/products/agriculture-cattle.jpg", 
      category: "Agriculture",
      buttonText: "Learn More",
      slug: "agriculture_product"
    },
    {
      name: "Consumer Electronics",
      description: "Latest technology products and consumer electronics for international distribution.",
      image: "/images/products/consumer-electronics.jpg",
      category: "Technology",
      buttonText: "Learn More",
      slug: "consumer_electronics"
    },
   
    {
      name: "Textiles & Fashion",
      description: "Quality textiles and fashion products for international retail and wholesale markets.",
      image: "/images/products/textiles_and_fashion.jpg",
      category: "Fashion",
      buttonText: "Learn More",
      slug: "textiles_fashion"
    },
    {
      name: "Automotive Components",
      description: "Precision automotive components for global manufacturers.",
      image: "/images/products/automotive.jpg",
      category: "Automotive", 
      buttonText: "Learn More",
      slug: "automotive_components"
    }
  ];

  const handleProductClick = (productSlug: string) => {
    console.log('Product card clicked:', productSlug);
    console.log('Navigating to:', `/products/${productSlug}`);
    setLocation(`/products/${productSlug}`);
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <style>
        {`
          .products-swiper .swiper-button-next,
          .products-swiper .swiper-button-prev {
            display: none;
          }
          
          @media screen and (max-width: 769px) {
            .swiper-button-prev-custom,
            .swiper-button-next-custom {
              display: flex;
            }
          }
        `}
      </style>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-full font-medium mb-6 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 text-[18px]">
            Our Products
          </div>
          <h2 className="text-lg sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-gray-900 dark:text-white">Premium </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Commodities</span>
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Sourcing and delivering the finest agricultural products to markets worldwide with uncompromising quality standards
          </p>
        </div>

        {/* Products Grid with Navigation */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            loop={false}
            grabCursor={true}
            allowTouchMove={true}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              770: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="products-swiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <div 
                  onClick={(e) => {
                    e.preventDefault();
                    handleProductClick(product.slug);
                  }}
                  className="noise-grid gradient-border glass rounded-xl shadow-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-600/20 hover:shadow-xl transition-all duration-300 hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer hover:scale-105"
                  style={{ pointerEvents: 'auto' }}
                >
                  {/* Product Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden rounded-lg m-2 sm:m-3 mb-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  
                  {/* Product Content */}
                  <div className="p-3 sm:p-4 pt-2 sm:pt-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Bottom Section */}
                    <div className="flex items-center justify-between">
                      {/* Category Badge */}
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100/70 dark:bg-gray-700/70 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                        {product.category}
                      </span>
                      
                      {/* Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product.slug);
                        }}
                        className="bg-white/10 hover:bg-white/20 dark:bg-gray-700/10 dark:hover:bg-gray-600/20 backdrop-blur-md border border-white/20 dark:border-gray-600/20 text-gray-900 dark:text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        {product.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-600/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl z-10">
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </div>
          <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-600/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl z-10">
            <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}