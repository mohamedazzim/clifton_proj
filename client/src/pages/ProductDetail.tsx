import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '../components/LanguageProvider';
import { useTheme } from '../components/ThemeProvider';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProductsThreeBackground } from '../components/ProductsThreeBackground';
import { LoadingScreen } from '../components/LoadingScreen';
import { BackToTopButton } from '../components/BackToTopButton';


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
      coffeeSpecialStyle: true,
      detailedDescription: 'Coffee beans are one of the world\'s most cherished commodities, connecting continents and cultures through a shared love for a perfect cup. As a leading import and export trading company, we specialize in the global trade of high-quality coffee beans, sourcing from renowned coffee-growing regions renowned for their distinct flavors and exceptional quality.\n\nOur company partners with trusted farmers and cooperatives to ensure that every bean meets rigorous standards for freshness, origin authenticity, and sustainability. We offer a diverse range of coffee beans, including Arabica and Robusta varieties, each with unique profiles suited to diverse markets and brewing preferences.\n\nWith a robust logistics network and commitment to transparency, we facilitate seamless movement of goods from farms to markets worldwide. Our focus on quality control and sustainable sourcing helps our clients deliver premium coffee experiences to their customers while supporting environmentally and socially responsible practices.\n\nWhether you are looking for organic, specialty, or bulk coffee beans, our tailored solutions and extensive industry expertise enable us to meet your sourcing needs efficiently and reliably. Partner with us for your coffee trading needs and enjoy a seamless supply chain backed by professionalism and integrity.',
      specifications: ['Grade A arabica beans', 'Moisture content: 8-12%', 'Screen size: 15-18', 'Processing: Washed and natural'],
      origins: ['Ethiopia', 'Colombia', 'Brazil', 'Guatemala'],
      certifications: ['Fair Trade', 'Organic', 'UTZ Certified'],
      tradeVolume: '500-5,000 MT',
      minOrder: '50 MT'
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
      minOrder: '12500 MT'
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
      minOrder: '5000 MT'
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
      minOrder: '12500 MT'
    },
    'premium cotton fabrics': {
      name: 'Premium Cotton Fabrics',
      title: 'Premium Cotton Fabrics',
      image: '/images/products/agricultural/coffee.jpg',
      gradient: 'from-blue-600 to-blue-800',
      description: 'High-quality cotton textiles from certified organic farms for fashion and home applications',
      detailedDescription: 'Premium cotton fabrics represent the pinnacle of textile excellence, sourced from the world\'s finest cotton-producing regions. Our comprehensive portfolio includes organic cotton, conventional cotton, and specialty blends designed to meet the demanding requirements of fashion houses, home textile manufacturers, and industrial applications.\n\nAs a leading trader in premium cotton textiles, CLIFTON maintains direct relationships with certified mills and producers who adhere to the highest standards of quality, sustainability, and ethical production. Our cotton fabrics are carefully selected for their superior fiber length, strength, and consistency, ensuring exceptional performance in end-use applications.\n\nWe offer a diverse range of cotton fabric specifications, from lightweight voiles and lawns perfect for summer garments to heavy-duty canvas and denim suitable for industrial applications. Each fabric undergoes rigorous quality testing to ensure compliance with international standards for colorfastness, shrinkage, and durability.\n\nOur commitment to sustainability extends throughout our supply chain, with a focus on organic and responsibly sourced cotton that supports environmental stewardship and fair labor practices. Partner with CLIFTON for your premium cotton fabric needs and experience the reliability that comes from working with industry professionals dedicated to excellence.',
      specifications: ['100% Cotton or Cotton Blends', 'Weight: 80-400 GSM', 'Width: 150-280 cm', 'Organic & GOTS Certified options available'],
      origins: ['India', 'Egypt', 'USA', 'Turkey'],
      certifications: ['GOTS Certified', 'OEKO-TEX Standard 100', 'Fair Trade', 'Organic Cotton'],
      tradeVolume: '50-500 MT',
      minOrder: '5 MT'
    },
    'luxury silk products': {
      name: 'Luxury Silk Products',
      title: 'Luxury Silk Products',
      image: '/images/products/agricultural/salt.jpg',
      gradient: 'from-purple-600 to-purple-800',
      description: 'Premium silk fabrics and garments sourced from traditional silk-producing regions',
      detailedDescription: 'Luxury silk products epitomize elegance and quality in the global textile market. Our extensive collection features the finest silk fabrics sourced from traditional silk-producing regions known for their centuries-old expertise in sericulture and silk weaving.\n\nCLIFTON specializes in premium silk varieties including Mulberry silk, Tussah silk, and specialty blends that combine silk with other premium fibers. Our silk products range from delicate chiffons and satins perfect for haute couture to robust silk blends suitable for luxury home furnishings and accessories.\n\nWe maintain direct partnerships with certified silk producers who uphold traditional quality standards while incorporating modern sustainable practices. Each silk product is carefully inspected for luster, drape, and consistency, ensuring that only the finest materials reach our clients.\n\nOur silk portfolio caters to diverse market segments including luxury fashion houses, interior designers, and specialty retailers seeking authentic, high-quality silk products. We understand the unique requirements of silk handling, storage, and transportation, ensuring that products maintain their integrity throughout the supply chain.\n\nExperience the timeless appeal of premium silk with CLIFTON as your trusted trading partner in the luxury textile market.',
      specifications: ['100% Pure Silk or Silk Blends', 'Weight: 12-25 Momme', 'Width: 114-140 cm', 'Grade A+ Quality'],
      origins: ['China', 'India', 'Japan', 'Italy'],
      certifications: ['Cradle to Cradle Certified', 'OEKO-TEX Standard 100', 'Mulberry Silk Certified'],
      tradeVolume: '10-100 MT',
      minOrder: '1 MT'
    },
    'synthetic fiber textiles': {
      name: 'Synthetic Fiber Textiles',
      title: 'Synthetic Fiber Textiles',
      image: '/images/products/agricultural/soybeans.jpg',
      gradient: 'from-green-600 to-green-800',
      description: 'Modern synthetic textiles including polyester, nylon, and blended fabrics for industrial use',
      detailedDescription: 'Synthetic fiber textiles represent the cutting edge of modern textile technology, offering superior performance characteristics for demanding industrial and commercial applications. Our comprehensive range includes polyester, nylon, polypropylene, and advanced technical fabrics designed to meet specific performance requirements.\n\nCLIFTON partners with leading synthetic textile manufacturers who utilize state-of-the-art production technologies to create fabrics with enhanced durability, moisture management, and specialized properties. Our synthetic textiles serve diverse industries including automotive, aerospace, medical, and technical applications.\n\nOur product portfolio encompasses lightweight performance fabrics for sportswear and activewear, heavy-duty industrial textiles for filtration and geotextile applications, and specialty synthetic blends that combine the best properties of multiple fiber types.\n\nWe understand the critical importance of consistency and performance in synthetic textiles, which is why all our products undergo rigorous testing for strength, chemical resistance, and dimensional stability. Our technical team works closely with clients to identify the optimal synthetic textile solutions for their specific applications.\n\nLeverage the advantages of modern synthetic textiles with CLIFTON as your reliable partner in advanced textile solutions.',
      specifications: ['Polyester, Nylon, PP, Technical Blends', 'Weight: 50-800 GSM', 'Width: 150-320 cm', 'Performance Enhanced'],
      origins: ['China', 'Turkey', 'South Korea', 'Taiwan'],
      certifications: ['ISO 9001', 'REACH Compliant', 'Recycled Content Certified'],
      tradeVolume: '100-1,000 MT',
      minOrder: '10 MT'
    },
    'fashion accessories': {
      name: 'Fashion Accessories',
      title: 'Fashion Accessories',
      image: '/images/products/agricultural/sugar.jpg',
      gradient: 'from-red-600 to-red-800',
      description: 'Complete range of fashion accessories including belts, bags, scarves, and jewelry components',
      detailedDescription: 'Fashion accessories form an integral part of the global fashion industry, providing the finishing touches that define style and personal expression. CLIFTON offers a comprehensive range of fashion accessories sourced from skilled artisans and established manufacturers worldwide.\n\nOur extensive accessories portfolio includes leather goods such as belts, handbags, and wallets; textile accessories including scarves, shawls, and wraps; and jewelry components ranging from findings and beads to finished pieces. Each category is carefully curated to meet the diverse needs of fashion retailers, designers, and distributors.\n\nWe maintain partnerships with certified suppliers who combine traditional craftsmanship with modern production techniques, ensuring consistent quality and timely delivery. Our accessories are available in various materials including genuine leather, synthetic alternatives, precious and semi-precious metals, and sustainable materials.\n\nQuality control is paramount in our accessories division, with each product undergoing thorough inspection for craftsmanship, durability, and finish quality. We understand the seasonal nature of fashion accessories and work closely with clients to align inventory with market trends and seasonal demands.\n\nElevate your fashion offerings with premium accessories from CLIFTON, your trusted partner in the global fashion accessory trade.',
      specifications: ['Mixed Materials: Leather, Metal, Textile', 'Various Sizes & Designs', 'Seasonal Collections', 'Custom Manufacturing Available'],
      origins: ['India', 'China', 'Italy', 'Turkey'],
      certifications: ['Leather Working Group Certified', 'Responsible Jewelry Council', 'Fair Trade'],
      tradeVolume: '5-50 MT',
      minOrder: '500 kg'
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

  // Special coffee styling
  const isCoffeeProduct = productName === 'coffee';
  const coffeeStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
    
    .coffee-title {
      font-family: 'Dancing Script', cursive;
      background: linear-gradient(135deg, #8B4513, #D2691E, #CD853F);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3);
      filter: drop-shadow(1px 1px 2px rgba(139, 69, 19, 0.2));
    }
    
    .coffee-bg {
      background: linear-gradient(135deg, #FFF8DC, #F5DEB3, #DEB887);
    }
    
    .coffee-card {
      background: linear-gradient(135deg, rgba(255, 248, 220, 0.9), rgba(245, 222, 179, 0.9));
      border: 2px solid rgba(210, 105, 30, 0.2);
      box-shadow: 0 8px 32px rgba(139, 69, 19, 0.15);
    }
    
    .coffee-accent {
      color: #8B4513;
      font-weight: 600;
    }
  `;

  return (
    <>
      {isCoffeeProduct && <style dangerouslySetInnerHTML={{ __html: coffeeStyles }} />}
      <div className={`min-h-screen ${isCoffeeProduct ? 'coffee-bg' : 'bg-stone-50 dark:bg-gray-900'}`}>
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

            
            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 text-white drop-shadow-2xl ${isCoffeeProduct ? 'coffee-title' : ''}`}>
              {product.title}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-lg">
              {product.description}
            </p>
            

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
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t("productDetail.tradeVolume")}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{product.tradeVolume}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t("productDetail.minOrder")}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{product.minOrder}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="lg:col-span-2">
              <div className="noise-grid gradient-border glass rounded-3xl p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-600/30">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t("productDetail.aboutProduct")}</h2>
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("productDetail.specifications")}</h3>
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("productDetail.origins")}</h3>
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("productDetail.certifications")}</h3>
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
              <div className="flex justify-center">
                <button 
                  onClick={() => {
                    // Navigate to homepage with contact hash
                    window.location.href = '/#contact';
                  }}
                  className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  Contact Sales Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

        <Footer />
        <BackToTopButton />
      </div>
    </>
  );
};

export default ProductDetail;