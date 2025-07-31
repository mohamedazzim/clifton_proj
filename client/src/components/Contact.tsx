import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { useLanguage } from "./LanguageProvider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContact } from "@shared/schema";

export function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const createContactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t("contact.form.success.title"),
        description: t("contact.form.success.description"),
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: t("contact.form.error.title"),
        description: t("contact.form.error.description"),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    createContactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6 px-4">{t("contact.title")}</h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="noise-grid gradient-border glass rounded-2xl p-6 sm:p-8 animate-slide-right relative overflow-hidden bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-md">
            {/* Moving Vector Elements in Contact Form */}
            <div className="absolute top-6 right-6 w-8 h-8 opacity-10 animate-vector-slide">
              <svg viewBox="0 0 32 32" className="w-full h-full text-current">
                <polygon points="16,4 28,20 4,20" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-6">{t("contact.form.title")}</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.name")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("contact.form.namePlaceholder")} 
                          {...field} 
                          className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:ring-black dark:focus:ring-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.email")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder={t("contact.form.emailPlaceholder")} 
                          {...field} 
                          className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:ring-black dark:focus:ring-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.message")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={6}
                          placeholder={t("contact.form.messagePlaceholder")} 
                          {...field} 
                          className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:ring-black dark:focus:ring-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover-scale transition-transform duration-300 font-semibold"
                  disabled={createContactMutation.isPending}
                >
                  {createContactMutation.isPending ? t("contact.form.sending") : t("contact.form.send")}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 animate-slide-left">
            <div className="noise-grid gradient-border glass rounded-2xl p-6 sm:p-8 bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-md">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Modern office building in Madrid, Spain" 
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <h3 className="text-2xl font-bold mb-6">{t("contact.info.title")}</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt w-6 text-gray-600 dark:text-gray-400"></i>
                  <span className="ml-3">{t("contact.info.address")}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone w-6 text-gray-600 dark:text-gray-400"></i>
                  <span className="ml-3">+34 91 123 4567</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope w-6 text-gray-600 dark:text-gray-400"></i>
                  <span className="ml-3">info@clifton.es</span>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-whatsapp w-6 text-gray-600 dark:text-gray-400"></i>
                  <span className="ml-3">+34 600 123 456</span>
                </div>
              </div>
            </div>

            <div className="noise-grid gradient-border glass rounded-2xl p-6 sm:p-8 bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-md">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{t("contact.hours.title")}</h4>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>{t("contact.hours.weekdays")}</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.hours.saturday")}</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.hours.sunday")}</span>
                  <span>{t("contact.hours.closed")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
