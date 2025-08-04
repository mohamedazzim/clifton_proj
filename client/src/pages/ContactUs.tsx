import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BackToTopButton } from '@/components/BackToTopButton';
import { ThreeBackground } from '@/components/ThreeBackground';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    inquiryType: '',
    message: ''
  });

  useEffect(() => {
    // Hero section animation
    gsap.fromTo('.contact-hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo('.contact-hero-subtitle', 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    // Contact cards animation
    gsap.fromTo('.contact-card', 
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
        }
      }
    );

    // Form animation
    gsap.fromTo('.contact-form', 
      { x: 40, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: t('contact.form.success.title'),
          description: t('contact.form.success.description'),
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          inquiryType: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('contact.form.error.title'),
        description: t('contact.form.error.description'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contactUs.headOffice'),
      content: t('contact.info.address'),
      secondary: t('contact.info.location'),
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Phone,
      title: t('contactUs.phoneNumbers'),
      content: '0055 11 4559-3029',
      secondary: '0055 11 99734-5464 | 0055 11 96488-9444',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Mail,
      title: t('contactUs.emailAddresses'),
      content: 'info@cliftontraders.com',
      secondary: 'sales@cliftontraders.com',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Clock,
      title: t('contactUs.businessHours'),
      content: 'Monday - Friday: 9:00 AM - 6:00 PM',
      secondary: 'Saturday: 10:00 AM - 2:00 PM (CET)',
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];



  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <ThreeBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="contact-hero-title text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
            {t('contactUs.title')}
          </h1>
          <p className="contact-hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('contactUs.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="contact-card bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <IconComponent className={`w-12 h-12 mx-auto mb-4 ${info.color}`} />
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">
                      {info.content}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {info.secondary}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Centered Main Contact Section */}
          <div className="flex justify-center">
            {/* Contact Form */}
            <div className="contact-form w-full max-w-2xl">
              <Card className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-2xl">
                <CardContent className="p-8 lg:p-12">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                    {t('contactUs.sendMessage')}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          {t('contact.form.name')} *
                        </label>
                        <Input
                          placeholder={t('contact.form.namePlaceholder')}
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          {t('contact.form.email')} *
                        </label>
                        <Input
                          type="email"
                          placeholder={t('contact.form.emailPlaceholder')}
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          {t('contactUs.company')}
                        </label>
                        <Input
                          placeholder={t('contactUs.companyName')}
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          {t('contactUs.phoneNumber')}
                        </label>
                        <Input
                          placeholder="+55 11 XXXXX-XXXX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          {t('contactUs.inquiryType')} *
                        </label>
                        <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                          <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600">
                            <SelectValue placeholder={t('contactUs.selectInquiryType')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="import">{t('contactUs.importServices')}</SelectItem>
                            <SelectItem value="export">{t('contactUs.exportServices')}</SelectItem>
                            <SelectItem value="agricultural">{t('contactUs.agriculturalProducts')}</SelectItem>
                            <SelectItem value="textiles">{t('contactUs.textilesAndFashion')}</SelectItem>
                            <SelectItem value="compliance">{t('contactUs.complianceAndDocumentation')}</SelectItem>
                            <SelectItem value="logistics">{t('contactUs.logisticsAndShipping')}</SelectItem>
                            <SelectItem value="other">{t('contactUs.other')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          {t('contactUs.subject')} *
                        </label>
                        <Input
                          placeholder={t('contactUs.briefSubject')}
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                          className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        {t('contact.form.message')} *
                      </label>
                      <Textarea
                        placeholder={t('contact.form.messagePlaceholder')}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        rows={5}
                        className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {t('contact.form.send')}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTopButton />
    </div>
  );
}