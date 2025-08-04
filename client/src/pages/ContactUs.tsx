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
  MessageSquare, 
  Send,
  Globe,
  FileText,
  Truck,
  Users
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
      content: '+34 91 123 4567',
      secondary: `${t('contactUs.emergency')}: +34 900 123 456`,
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

  const departments = [
    {
      icon: Users,
      title: t('contactUs.salesDepartment'),
      email: 'sales@cliftontraders.com',
      phone: '+34 91 123 4567',
      description: t('contactUs.salesDesc')
    },
    {
      icon: Truck,
      title: t('contactUs.operations'),
      email: 'operations@cliftontraders.com',
      phone: '+34 91 123 4568',
      description: t('contactUs.operationsDesc')
    },
    {
      icon: FileText,
      title: t('contactUs.compliance'),
      email: 'compliance@cliftontraders.com',
      phone: '+34 91 123 4569',
      description: t('contactUs.complianceDesc')
    },
    {
      icon: MessageSquare,
      title: t('contactUs.customerSupport'),
      email: 'support@cliftontraders.com',
      phone: '+34 91 123 4570',
      description: t('contactUs.customerSupportDesc')
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

          {/* Main Contact Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="contact-form">
              <Card className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
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
                          placeholder={t('contactUs.yourCompanyName')}
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
                          placeholder="+34 XXX XXX XXX"
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

            {/* Department Contacts */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                {t('contactUs.departmentContacts')}
              </h2>
              <div className="grid gap-6">
                {departments.map((dept, index) => {
                  const IconComponent = dept.icon;
                  return (
                    <Card key={index} className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                              {dept.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                              {dept.description}
                            </p>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <a href={`mailto:${dept.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                  {dept.email}
                                </a>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <a href={`tel:${dept.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                  {dept.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              {t('contactUs.findOurOffice')}
            </h2>
            <Card className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
              <CardContent className="p-0">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.7912928248436!2d-3.6945275!3d40.4202343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228e7a80e0b7b%3A0x24b4b5c2cbd5c17e!2sCalle%20de%20Alcal%C3%A1%2C%20123%2C%2028014%20Madrid%2C%20Spain!5e0!3m2!1sen!2ses!4v1652345678901!5m2!1sen!2ses"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-lg"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media & Additional Info */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              {t('contactUs.stayConnected')}
            </h2>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                <Globe className="w-8 h-8" />
              </a>
              <a href="mailto:info@cliftontraders.com" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors">
                <Mail className="w-8 h-8" />
              </a>
              <a href="tel:+34911234567" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
                <Phone className="w-8 h-8" />
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('contactUs.emergencyInfo')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTopButton />
    </div>
  );
}