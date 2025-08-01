import { useLanguage } from "./LanguageProvider";

interface Client {
  name: string;
  logo: string;
}

export function OurClients() {
  const { t } = useLanguage();

  const clients: Client[] = [
    { name: "Client 1", logo: "/images/our_clients/IMG-20250625-WA0025.jpg" },
    { name: "Client 2", logo: "/images/our_clients/IMG-20250625-WA0026.jpg" },
    { name: "Client 3", logo: "/images/our_clients/IMG-20250625-WA0027.jpg" },
    { name: "Client 4", logo: "/images/our_clients/IMG-20250625-WA0028.jpg" }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-3 dark:opacity-5">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gray-500/10 to-blue-500/10 rounded-full border border-gray-200/30 dark:border-gray-700/30 mb-6">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Our Trusted Partners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-blue-600">Clients</span>
          </h2>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Client Logo Container */}
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transform hover:-translate-y-2 hover:scale-105 overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-3 right-3 w-6 h-6 opacity-5 group-hover:opacity-10 transition-all duration-500">
                  <svg viewBox="0 0 24 24" className="w-full h-full text-current">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none">
                      <animateTransform attributeName="transform" type="rotate" values="0 12 12; 360 12 12" dur="20s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="12" cy="6" r="2" fill="currentColor">
                      <animateTransform attributeName="transform" type="rotate" values="0 12 12; 360 12 12" dur="20s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                </div>

                {/* Client Logo */}
                <div className="relative z-10 flex items-center justify-center h-16 sm:h-20 lg:h-24">
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 rounded-3xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Partnering with industry leaders worldwide to deliver exceptional commodity trading solutions
          </p>
        </div>
      </div>
    </section>
  );
}