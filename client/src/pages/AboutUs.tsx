import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BackToTopButton } from '@/components/BackToTopButton';
import { ThreeBackground } from '@/components/ThreeBackground';
import { useLanguage } from '@/components/LanguageProvider';
import { Building2, Globe, Users, Award, Target, Eye, Heart, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const { t } = useLanguage();

  useEffect(() => {
    // Hero section animation
    gsap.fromTo('.about-hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo('.about-hero-subtitle', 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    // Stagger animation for content sections
    gsap.fromTo('.about-section', 
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          end: 'bottom 20%',
        }
      }
    );

    // Stats animation
    gsap.fromTo('.stat-item', 
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 85%',
        }
      }
    );

    // Values animation
    gsap.fromTo('.value-card', 
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.values-section',
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stats = [
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '50+', label: 'Countries Served', icon: Globe },
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '1000+', label: 'Projects Completed', icon: Building2 }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We maintain the highest standards in every aspect of our international trade operations.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Trust and transparency form the foundation of all our business relationships.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We leverage cutting-edge technology and modern solutions to streamline global trade.'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'Our worldwide network enables us to understand and serve diverse international markets.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <ThreeBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="about-hero-title text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
            {t('aboutUs.title')}
          </h1>
          <p className="about-hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('vision.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-content py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Company Story */}
          <div className="about-section mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('aboutUs.ourStory')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {t('aboutUs.storyDescription')}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('aboutUs.storyDescription2')}
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-xl">
                  <div className="text-center">
                    <Building2 className="w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      Established
                    </h3>
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2009</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Madrid, Spain
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="about-section mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-xl">
                <Eye className="w-12 h-12 mb-4 text-green-600 dark:text-green-400" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {t('vision.vision.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('vision.vision.description')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-xl">
                <Target className="w-12 h-12 mb-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {t('vision.mission.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('vision.mission.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="stats-section about-section mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {t('aboutUs.ourImpact')}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="stat-item text-center p-6 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What Makes Us Unique */}
          <div className="about-section mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {t('aboutUs.whatMakesUsUnique')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                <Globe className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Global Network
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Strategic partnerships across 50+ countries enable us to source the best products at competitive prices while ensuring quality and compliance.
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                <Award className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Certified Excellence
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ISO 9001:2015 certified with full compliance to international trade regulations and quality management systems.
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                <Users className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Expert Team
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our experienced professionals bring deep expertise in international trade, customs regulations, and market intelligence.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="values-section about-section">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {t('aboutUs.coreValues')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="value-card p-6 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300">
                    <IconComponent className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTopButton />
    </div>
  );
}