import React, { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);

  // Tesla/Apple-style form animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.contact-form', { y: 80, opacity: 0, scale: 0.95 });
      gsap.set('.form-field', { y: 50, opacity: 0 });
      gsap.set('.form-button', { y: 30, opacity: 0, scale: 0.9 });

      // Entrance animation with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.to('.contact-form', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
      })
      .to('.form-field', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.5')
      .to('.form-button', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, '-=0.2');

      // Focus animations for form fields
      const formFields = document.querySelectorAll('.form-field input, .form-field textarea');
      formFields.forEach((field) => {
        field.addEventListener('focus', () => {
          gsap.to(field.closest('.form-field'), {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        field.addEventListener('blur', () => {
          gsap.to(field.closest('.form-field'), {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Submission animation
    gsap.to('.form-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Success animation
        gsap.fromTo('.success-message', 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("contact.title")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="contact-form noise-grid gradient-border glass rounded-2xl p-6 sm:p-8 lg:p-10 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-600/20 shadow-2xl"
        >
          <div ref={fieldsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="form-field">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                {t("contact.form.name")}
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder={t("contact.form.namePlaceholder")}
              />
            </div>

            <div className="form-field">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                {t("contact.form.email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder={t("contact.form.emailPlaceholder")}
              />
            </div>
          </div>

          <div className="form-field mb-6">
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              {t("contact.form.subject")}
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder={t("contact.form.subjectPlaceholder")}
            />
          </div>

          <div className="form-field mb-8">
            <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              {t("contact.form.message")}
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              placeholder={t("contact.form.messagePlaceholder")}
            />
          </div>

          <div className="form-button text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t("contact.form.sending")}
                </div>
              ) : (
                t("contact.form.submit")
              )}
            </Button>
          </div>

          {submitStatus === 'success' && (
            <div className="success-message mt-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg text-center">
              <p className="text-green-700 dark:text-green-300">{t("contact.form.success")}</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg text-center">
              <p className="text-red-700 dark:text-red-300">{t("contact.form.error")}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}