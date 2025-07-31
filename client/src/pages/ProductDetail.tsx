import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '../components/LanguageProvider';
import { useTheme } from '../components/ThemeProvider';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProductsThreeBackground } from '../components/ProductsThreeBackground';
import { LoadingScreen } from '../components/LoadingScreen';


interface ProductDetailProps {
  category: string;
  productName: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ category, productName }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  // Product details data
  const productDetails = {
    'coffee': {
      name: 'Coffee',
      title: 'Premium Coffee',
      image: '/images/products/agricultural/coffee.jpg',
      gradient: 'from-amber-600 to-amber-800',
      description: 'Premium quality coffee beans sourced from the finest farms worldwide',
      detailedDescription: 'Coffee beans are one of the world\'s most cherished commodities, connecting continents and cultures through a shared love for a perfect cup. As a leading import and export trading company, we specialize in the global trade of high-quality coffee beans, sourcing from renowned coffee-growing regions renowned for their distinct flavors and exceptional quality.\n\nOur company partners with trusted farmers and cooperatives to ensure that every bean meets rigorous standards for freshness, origin authenticity, and sustainability. We offer a diverse range of coffee beans, including Arabica and Robusta varieties, each with unique profiles suited to diverse markets and brewing preferences.\n\nWith a robust logistics network and commitment to transparency, we facilitate seamless movement of goods from farms to markets worldwide. Our focus on quality control and sustainable sourcing helps our clients deliver premium coffee experiences to their customers while supporting environmentally and socially responsible practices.\n\nWhether you are looking for organic, specialty, or bulk coffee beans, our tailored solutions and extensive industry expertise enable us to meet your sourcing needs efficiently and reliably. Partner with us for your coffee trading needs and enjoy a seamless supply chain backed by professionalism and integrity.',
      specifications: ['Grade A arabica beans', 'Moisture content: 8-12%', 'Screen size: 15-18', 'Processing: Washed and natural'],
      origins: ['Ethiopia', 'Colombia', 'Brazil', 'Guatemala'],
      certifications: ['Fair Trade', 'Organic', 'UTZ Certified'],
      tradeVolume: '500-5,000 MT',
      minOrder: '25 MT'
    },
    'salt': {
      name: 'Salt',
      title: 'Industrial & Food Grade Salt',
      image: '/images/products/agricultural/salt.jpeg',
      gradient: 'from-blue-600 to-blue-800',
      description: 'High-grade industrial and food-grade salt for various applications',
      detailedDescription: 'Salt is an essential commodity with widespread applications across food processing, chemical manufacturing, and industrial sectors. As a leading trader in the global salt market, CLIFTON specializes in sourcing and distributing premium quality salt products to meet diverse industry requirements.\n\nOur comprehensive salt portfolio includes refined table salt, sea salt, rock salt, and industrial-grade salts, each carefully selected from certified sources worldwide. We work with established salt producers who maintain the highest standards of purity, quality, and environmental responsibility.\n\nWith our extensive logistics network and deep understanding of international trade regulations, we ensure reliable supply chains that deliver consistent quality and timely shipments. Our commitment to excellence extends from sourcing to delivery, providing our clients with dependable salt solutions that meet their specific operational needs.\n\nWhether you require food-grade salt for processing applications or industrial salt for manufacturing processes, CLIFTON delivers customized solutions backed by our expertise and commitment to quality. Partner with us for your salt trading needs and experience the reliability that comes from working with industry professionals.',
      specifications: ['Purity: 99.5%+', 'Moisture: <0.5%', 'Particle size: Various grades', 'Food grade certified'],
      origins: ['Mediterranean Sea', 'Dead Sea', 'Himalayan Mines'],
      certifications: ['ISO 9001', 'HACCP', 'FDA Approved'],
      tradeVolume: '1,000-10,000 MT',
      minOrder: '50 MT'
    },
    'sugar': {
      name: 'Sugar',
      title: 'Refined & Raw Sugar',
      image: '/images/products/agricultural/sugar.jpg',
      gradient: 'from-pink-600 to-pink-800',
      description: 'Refined and raw sugar varieties meeting international quality standards',
      detailedDescription: 'Sugar is a fundamental commodity with a significant role in the global food and beverage industry. As one of the most widely traded agricultural products, sugar is essential for producing a wide range of products, from sweetened foods and beverages to biofuels and industrial applications.\n\nOur company specializes in the export of premium quality sugar, serving clients across diverse markets. We source sugar from reputable producers who adhere to international quality standards, ensuring that our products meet strict specifications for purity, moisture content, and safety.\n\nLeveraging an extensive logistics infrastructure, we facilitate efficient and reliable trade flows across regions, ensuring timely deliveries to meet our clients\' production schedules and market demands. Our commitment to transparency and sustainability means we work closely with suppliers practicing environmentally responsible farming and processing methods.\n\nWhether you need raw, refined, or specialty sugar, our comprehensive portfolio and global network enables us to provide customized solutions tailored to your business needs. As your trusted trading partner, we are dedicated to supporting your success in the rapidly evolving sugar market.',
      specifications: ['Polarization: 99.8° min', 'Moisture: 0.04% max', 'Ash content: 0.04% max', 'ICUMSA 45 rating'],
      origins: ['Brazil', 'Thailand', 'India', 'Australia'],
      certifications: ['ISO 22000', 'Kosher', 'Halal'],
      tradeVolume: '2,000-25,000 MT',
      minOrder: '100 MT'
    },
    'soybeans': {
      name: 'Soybeans',
      title: 'Sustainable Soybeans',
      image: '/images/products/agricultural/soye.jpg',
      gradient: 'from-green-600 to-green-800',
      description: 'Sustainable soybean products for food and industrial applications',
      detailedDescription: 'At Clifton, we specialize in the global export of high-quality soy products, serving as a trusted link between producers and markets worldwide. With extensive industry experience and a comprehensive understanding of international trade regulations, we ensure a seamless and efficient supply chain.\n\nOur soy offerings include soybeans, soymeal, soy oil, and other derivatives, sourced from reputable growers committed to sustainable farming practices. We prioritize quality, consistency, and timely delivery, supporting our clients\' needs across agriculture, nutrition, and industrial sectors.\n\nAs a forward-thinking trading company, we stay abreast of market trends and global demand, allowing us to provide competitive pricing and customized solutions. Our dedicated team is committed to building long-term partnerships grounded in integrity, transparency, and excellence.\n\nDiscover how Clifton can be your dependable partner in the dynamic world of soy trading. Contact us today for more information and let\'s grow together.',
      specifications: ['Protein content: 34-38%', 'Oil content: 18-20%', 'Moisture: 13% max', 'GMO and non-GMO varieties'],
      origins: ['Brazil', 'Argentina', 'USA', 'Ukraine'],
      certifications: ['RTRS Certified', 'Non-GMO Project', 'ISCC Plus'],
      tradeVolume: '1,500-15,000 MT',
      minOrder: '75 MT'
    },
    'corn': {
      name: 'Corn',
      title: 'Premium Corn (Maize)',
      image: '/images/products/agricultural/sugar.jpg',
      gradient: 'from-yellow-600 to-yellow-800',
      description: 'Premium quality corn sourced from certified farms worldwide',
      detailedDescription: 'Corn, also known as maize, is one of the world\'s most vital staple crops, integral to global food security and agricultural economies. As a versatile grain, corn serves diverse purposes—from human consumption and animal feed to industrial applications such as biofuel production.\n\nOur company specializes in the export of high-quality corn, connecting farmers and producers with markets worldwide. We prioritize sourcing corn that meets international standards for purity, moisture content, and quality, ensuring our clients receive products that adhere to strict regulations and customer specifications.\n\nWith extensive logistics networks and advanced supply chain management, we facilitate seamless trade, ensuring timely delivery across continents. We are committed to sustainable and traceable sourcing practices, supporting farmers who use environmentally responsible cultivation methods.\n\nWhether you seek bulk shipments for large-scale industrial use or quality corn for retail, our expertise and global reach enable us to provide tailored solutions that meet your business needs. Trust us to be your reliable partner in navigating the dynamic landscape of corn trade internationally.',
      specifications: ['Moisture content: 14% max', 'Foreign matter: 2% max', 'Broken kernels: 5% max', 'Test weight: 56 lbs/bushel min'],
      origins: ['USA', 'Brazil', 'Argentina', 'Ukraine'],
      certifications: ['Non-GMO Project', 'Organic', 'Feed Grade', 'Food Grade'],
      tradeVolume: '2,000-20,000 MT',
      minOrder: '100 MT'
    }
  };

  const product = productDetails[productName as keyof typeof productDetails];

  // Add loading effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} duration={1000} />;
  }

  // If product not found, redirect to category page
  if (!product) {
    setLocation(`/products/${category}`);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black relative overflow-hidden">
      <ProductsThreeBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 lg:px-10 min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${product.image})`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto text-center relative z-20 w-full">
          <div className="animate-slide-up">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <button 
                onClick={() => setLocation(`/products/${category}`)}
                className="text-white/80 hover:text-white transition-colors duration-200 text-lg"
              >
                ← Back to Agricultural Products
              </button>
            </nav>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 text-white drop-shadow-2xl">
              {product.title}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-lg">
              {product.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group noise-grid gradient-border glass px-8 py-4 rounded-xl text-white hover-scale transition-all duration-500 font-semibold text-lg relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="relative z-10">Request Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
              <button className="group bg-white text-black px-8 py-4 rounded-xl hover-scale transition-all duration-500 font-semibold text-lg border-2 border-transparent hover:border-white/20 relative overflow-hidden">
                <span className="relative z-10">Download Specifications</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 transform skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <div className="noise-grid gradient-border glass rounded-3xl p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-600/30">
                <div className="aspect-square overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Trade Info */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Trade Volume</h4>
                    <p className="text-gray-600 dark:text-gray-400">{product.tradeVolume}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Minimum Order</h4>
                    <p className="text-gray-600 dark:text-gray-400">{product.minOrder}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="lg:col-span-2">
              <div className="noise-grid gradient-border glass rounded-3xl p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-600/30">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About This Product</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {product.detailedDescription.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Specifications */}
            <div className="noise-grid gradient-border glass rounded-3xl p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-600/30">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Specifications</h3>
              <ul className="space-y-3">
                {product.specifications?.map((spec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    <span className="text-gray-600 dark:text-gray-400 text-lg">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Origins */}
            <div className="noise-grid gradient-border glass rounded-3xl p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-600/30">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Origins</h3>
              <ul className="space-y-3">
                {product.origins?.map((origin: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    <span className="text-gray-600 dark:text-gray-400 text-lg">{origin}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="noise-grid gradient-border glass rounded-3xl p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-600/30">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Certifications</h3>
              <ul className="space-y-3">
                {product.certifications?.map((cert: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    <span className="text-gray-600 dark:text-gray-400 text-lg">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="noise-grid gradient-border glass rounded-3xl p-12 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-600/30">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ready to Order?</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Contact our team to discuss your requirements and get a competitive quote for {product.name.toLowerCase()}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  Request Quote
                </button>
                <button className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  Contact Sales Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;