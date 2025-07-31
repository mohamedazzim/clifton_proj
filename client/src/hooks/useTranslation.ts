import { useState, useEffect, useCallback } from 'react';
import { translationService, type ProductTranslationResponse } from '../lib/translationService';

export interface TranslatedProduct {
  description: string;
  detailedDescription: string;
  isLoading: boolean;
  error: string | null;
}

export function useProductTranslation(
  productName: string,
  originalDescription: string,
  originalDetailedDescription: string,
  targetLanguage: string
) {
  const [translatedProduct, setTranslatedProduct] = useState<TranslatedProduct>({
    description: originalDescription,
    detailedDescription: originalDetailedDescription,
    isLoading: false,
    error: null
  });

  const translateProduct = useCallback(async () => {
    // If target language is English, return original text
    if (targetLanguage === 'en') {
      setTranslatedProduct({
        description: originalDescription,
        detailedDescription: originalDetailedDescription,
        isLoading: false,
        error: null
      });
      return;
    }

    setTranslatedProduct(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const result = await translationService.translateProductDescription(
        productName,
        originalDescription,
        originalDetailedDescription,
        targetLanguage
      );

      setTranslatedProduct({
        description: result.description,
        detailedDescription: result.detailedDescription,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedProduct(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Translation failed'
      }));
    }
  }, [productName, originalDescription, originalDetailedDescription, targetLanguage]);

  useEffect(() => {
    translateProduct();
  }, [translateProduct]);

  return {
    ...translatedProduct,
    retryTranslation: translateProduct
  };
}