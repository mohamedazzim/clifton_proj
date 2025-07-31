export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface ProductTranslationResponse {
  description: string;
  detailedDescription: string;
}

export const supportedLanguages = {
  'en': 'English',
  'pt': 'Portuguese',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'ar': 'Arabic',
  'zh': 'Chinese (Simplified)',
  'ja': 'Japanese',
  'ko': 'Korean',
  'ru': 'Russian',
  'hi': 'Hindi'
};

class TranslationService {
  private cache = new Map<string, any>();
  private baseUrl = '/api/translation';

  private getCacheKey(text: string, targetLanguage: string): string {
    return `${targetLanguage}:${text.substring(0, 100)}`;
  }

  async getSupportedLanguages(): Promise<typeof supportedLanguages> {
    try {
      const response = await fetch(`${this.baseUrl}/languages`);
      if (!response.ok) {
        throw new Error('Failed to fetch supported languages');
      }
      const data = await response.json();
      return data.languages;
    } catch (error) {
      console.error('Error fetching supported languages:', error);
      return supportedLanguages; // Fallback to static list
    }
  }

  async translateText(
    text: string, 
    targetLanguage: string, 
    context?: string
  ): Promise<TranslationResponse> {
    const cacheKey = this.getCacheKey(text, targetLanguage);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage,
          context
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Translation failed');
      }

      const result: TranslationResponse = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async translateProductDescription(
    productName: string,
    description: string,
    detailedDescription: string,
    targetLanguage: string
  ): Promise<ProductTranslationResponse> {
    const cacheKey = this.getCacheKey(`${productName}:${description}:${detailedDescription}`, targetLanguage);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/translate-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          description,
          detailedDescription,
          targetLanguage
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Product translation failed');
      }

      const result: ProductTranslationResponse = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('Product translation error:', error);
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const translationService = new TranslationService();