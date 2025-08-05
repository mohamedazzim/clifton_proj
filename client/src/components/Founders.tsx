import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "./LanguageProvider";

interface Founder {
  id: number;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  experience: string;
  linkedinUrl: string;
  order: number;
}

export function Founders() {
  const { t } = useLanguage();



  const { data: founders, isLoading, error } = useQuery<Founder[]>({
    queryKey: ["founders"],
    queryFn: async () => {
      const response = await fetch("/api/founders");
      if (!response.ok) {
        throw new Error("Failed to fetch founders");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="noise-grid gradient-border glass rounded-2xl p-8 animate-pulse">
                <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-6 mx-auto"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600 dark:text-red-400">Error loading founders: {error.message}</p>
        </div>
      </section>
    );
  }

  if (!founders || founders.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">No founders data available.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="founders" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 relative overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            {t("founders.title")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t("founders.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {founders.map((founder, index) => (
            <div
              key={founder.id}
              className="noise-grid gradient-border glass rounded-2xl p-6 sm:p-8 text-center hover-scale transition-all duration-500 group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
              
              {/* Profile Image */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white/20 dark:ring-gray-700/50 shadow-xl">
                <img
                  src={founder.imageUrl}
                  alt={founder.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {founder.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-base sm:text-lg">
                    {founder.position}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {founder.bio}
                </p>

                {founder.experience && (
                  <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-sm text-gray-500 dark:text-gray-500 font-medium">
                      {founder.experience}
                    </p>
                  </div>
                )}

                {founder.linkedinUrl && (
                  <div className="pt-2">
                    <a
                      href={founder.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300 text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}