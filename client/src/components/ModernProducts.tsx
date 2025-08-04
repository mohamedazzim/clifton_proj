import React from 'react';
import { useLocation } from "wouter";
import { useLanguage } from "./LanguageProvider";

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
      name: t('products.agricultural.title'), 
      description: t('products.agricultural.description'),
      image: "/images/products/agriculture-cattle.jpg", 
      category: t("modernProducts.agriculture"),
      buttonText: t("modernProducts.learnMore"),
      slug: "agriculture_product"
    },
    {
      name: t('products.textiles.title'),
      description: t('products.textiles.description'),
      image: "/images/products/textiles_and_fashion.jpg",
      category: t("modernProducts.fashion"),
      buttonText: t("modernProducts.learnMore"),
      slug: "textiles_fashion"
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
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 sm:px-6 py-2 rounded-full font-medium mb-6 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 text-base sm:text-lg">
            {t('products.title')}
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
            <span className="text-gray-900 dark:text-white">{t("modernProducts.premiumCommodities")}</span>
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Products Grid - Responsive 2 Column Layout */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 justify-items-center px-4">
            {products.map((product, index) => (
              <div 
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  handleProductClick(product.slug);
                }}
                className="w-full max-w-md noise-grid gradient-border glass rounded-xl shadow-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-600/20 hover:shadow-xl transition-all duration-300 hover:bg-white/40 dark:hover:bg-gray-800/40 cursor-pointer hover:scale-105"
                style={{ pointerEvents: 'auto' }}
              >
                {/* Product Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden rounded-lg m-3 mb-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                {/* Product Content */}
                <div className="p-4 pt-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100/70 dark:bg-gray-700/70 px-3 py-1 rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>
                    
                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.slug);
                      }}
                      className="bg-white/10 hover:bg-white/20 dark:bg-gray-700/10 dark:hover:bg-gray-600/20 backdrop-blur-md border border-white/20 dark:border-gray-600/20 text-gray-900 dark:text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      {product.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}