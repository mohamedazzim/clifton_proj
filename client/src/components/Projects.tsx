import { useLanguage } from "./LanguageProvider";
import { Network, GraduationCap, Award, Handshake } from "lucide-react";

const getBenefitIcon = (benefitKey: string) => {
  switch (benefitKey) {
    case 'network':
      return (
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
            <Network className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-gray-900">🌍</span>
          </div>
        </div>
      );
    case 'expertise':
      return (
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-gray-900">📊</span>
          </div>
        </div>
      );
    case 'reliability':
      return (
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl transform rotate-2 group-hover:rotate-4 transition-transform duration-300">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-gray-900">⏰</span>
          </div>
        </div>
      );
    case 'customerCentric':
      return (
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 via-rose-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-300">
            <Handshake className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-gray-900">💡</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-2xl">
            <Network className="w-8 h-8 text-white" />
          </div>
        </div>
      );
  }
};

export function Projects() {
  const { t } = useLanguage();

  const benefits = [
    { key: 'network', title: t("projects.benefits.network.title"), description: t("projects.benefits.network.description") },
    { key: 'expertise', title: t("projects.benefits.expertise.title"), description: t("projects.benefits.expertise.description") },
    { key: 'reliability', title: t("projects.benefits.reliability.title"), description: t("projects.benefits.reliability.description") },
    { key: 'customerCentric', title: t("projects.benefits.customerCentric.title"), description: t("projects.benefits.customerCentric.description") },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-black dark:to-blue-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6 text-gray-900 dark:text-white">
            {t("projects.title")}
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Benefits Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.key}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card Container */}
              <div className="relative h-full bg-white dark:bg-gray-900 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transform hover:-translate-y-2 overflow-hidden">
                
                {/* Side Edge Glows */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center rounded-l-3xl"></div>
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center rounded-r-3xl"></div>
                
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon Container */}
                  <div className="flex justify-center mb-6">
                    {getBenefitIcon(benefit.key)}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-base sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {benefit.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Curved Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ borderRadius: '0 0 24px 24px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
