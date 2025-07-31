import { useLanguage } from "./LanguageProvider";

export function VisionMission() {
  const { t } = useLanguage();

  return (
    <section id="about" className="vision-mission-section py-20 bg-gradient-to-b from-white to-white dark:from-gray-950 dark:to-black relative overflow-hidden">
      <div className="absolute inset-0" style={{ opacity: 0.2 }}>
        <img 
          src="images/about_us/1.jpg" 
          alt="Import Export background" 
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(100%)' }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6 px-4">{t("vision.title")}</h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
            {t("vision.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12">
          <div className="noise-grid gradient-border glass rounded-2xl p-4 sm:p-6 lg:p-12 hover-scale transition-transform duration-300 relative overflow-hidden">
            {/* Moving Vector Elements */}
            <div className="absolute top-6 right-6 w-6 h-6 opacity-20">
              <svg viewBox="0 0 24 24" className="w-full h-full text-current">
                <path d="M4,12 L20,12 M17,9 L20,12 L17,15" stroke="currentColor" strokeWidth="1" fill="none">
                  <animateTransform attributeName="transform" type="translate" values="0,0; 3,0; 0,0" dur="3s" repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-600 dark:from-white dark:to-gray-300 rounded-xl flex items-center justify-center mb-6">
              <i className="fas fa-eye text-2xl text-white dark:text-black"></i>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">{t("vision.vision.title")}</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {t("vision.vision.description")}
            </p>
          </div>

          <div className="noise-grid gradient-border glass rounded-2xl p-4 sm:p-6 lg:p-12 hover-scale transition-transform duration-300 relative overflow-hidden">
            {/* Moving Vector Elements */}
            <div className="absolute top-6 right-6 w-6 h-6 opacity-20">
              <svg viewBox="0 0 24 24" className="w-full h-full text-current">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" fill="none">
                  <animateTransform attributeName="transform" type="rotate" values="0 12 12; 360 12 12" dur="8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="12" cy="6" r="1.5" fill="currentColor">
                  <animateTransform attributeName="transform" type="rotate" values="0 12 12; 360 12 12" dur="8s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-600 dark:from-white dark:to-gray-300 rounded-xl flex items-center justify-center mb-6">
              <i className="fas fa-bullseye text-2xl text-white dark:text-black"></i>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">{t("vision.mission.title")}</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {t("vision.mission.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
