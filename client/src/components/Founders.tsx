import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "./LanguageProvider";
import { Mail, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import type { Founder } from "@shared/schema";

import prof from "@assets/prof.jpg";

export function Founders() {
  const { t } = useLanguage();
  
  const { data: founders, isLoading } = useQuery<Founder[]>({
    queryKey: ["/api/founders"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">{t("founders.title")}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2].map((i) => (
              <div key={i} className="text-center">
                <div className="noise-grid gradient-border glass rounded-2xl p-8 animate-pulse bg-gray-100/90 dark:bg-gray-800/90 backdrop-blur-sm transform-gpu shadow-lg">
                  <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-1/2 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6 px-4">{t("founders.title")}</h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            {t("founders.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {founders?.map((founder) => (
            <div key={founder.id} className="text-center">
              <div className="noise-grid gradient-border glass rounded-2xl p-6 sm:p-8 hover-scale transition-all duration-500 bg-gray-100/90 dark:bg-gray-800/90 backdrop-blur-sm transform-gpu hover:rotate-y-3 hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/10 perspective-1000 hover:-translate-y-2">
                <div className="relative mb-4 sm:mb-6 transform-gpu transition-transform duration-300 hover:scale-110">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto relative overflow-hidden shadow-2xl ring-4 ring-white/20 dark:ring-gray-700/50">
                    <img 
                      src={prof} 
                      alt={founder.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="transform-gpu transition-all duration-300 hover:translate-z-4">
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{founder.name}</h3>
                  <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300 mb-2 sm:mb-4 font-medium">{founder.position}</p>
                  <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3 sm:mb-6">
                    {founder.bio}
                  </p>
                </div>
                
                {/* Social Media Icons */}
                <div className="flex justify-center space-x-4 transform-gpu transition-all duration-300 hover:scale-105">
                  {founder.email && (
                    <a 
                      href={`mailto:${founder.email}`}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 group transform hover:scale-110 hover:shadow-lg hover:-translate-y-1"
                      title="Send Email"
                    >
                      <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </a>
                  )}
                  {founder.linkedin && (
                    <a 
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 group transform hover:scale-110 hover:shadow-lg hover:-translate-y-1"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </a>
                  )}
                  {founder.twitter && (
                    <a 
                      href={founder.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-sky-900 transition-all duration-300 group transform hover:scale-110 hover:shadow-lg hover:-translate-y-1"
                      title="Twitter Profile"
                    >
                      <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                    </a>
                  )}
                  {founder.instagram && (
                    <a 
                      href={founder.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900 transition-all duration-300 group transform hover:scale-110 hover:shadow-lg hover:-translate-y-1"
                      title="Instagram Profile"
                    >
                      <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400" />
                    </a>
                  )}
                  {founder.facebook && (
                    <a 
                      href={founder.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 group transform hover:scale-110 hover:shadow-lg hover:-translate-y-1"
                      title="Facebook Profile"
                    >
                      <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
