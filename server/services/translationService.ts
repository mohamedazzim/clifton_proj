import OpenAI from 'openai';

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface TranslationRequest {
  text: string;
  targetLanguage: string;
  context?: string;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

const supportedLanguages = {
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

export async function translateText(request: TranslationRequest): Promise<TranslationResponse> {
  const { text, targetLanguage, context = 'agricultural product description' } = request;
  
  if (!supportedLanguages[targetLanguage as keyof typeof supportedLanguages]) {
    throw new Error(`Unsupported target language: ${targetLanguage}`);
  }

  const targetLanguageName = supportedLanguages[targetLanguage as keyof typeof supportedLanguages];
  
  const systemPrompt = `You are a professional translator specializing in business and agricultural trade documentation. 
  Translate the provided text to ${targetLanguageName} while maintaining:
  - Professional business tone
  - Technical accuracy for agricultural terms
  - Cultural appropriateness for international trade
  - Proper formatting and structure
  
  Context: This is a ${context} for an international trading company.
  
  Respond only with the translated text, no additional comments or explanations.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const translatedText = response.choices[0]?.message?.content?.trim();
    
    if (!translatedText) {
      throw new Error('Translation failed: No response from OpenAI');
    }

    return {
      translatedText,
      sourceLanguage: 'en',
      targetLanguage
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error(`Translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function translateProductDescription(
  productName: string,
  description: string,
  detailedDescription: string,
  targetLanguage: string
): Promise<{
  description: string;
  detailedDescription: string;
}> {
  const [translatedDescription, translatedDetailedDescription] = await Promise.all([
    translateText({
      text: description,
      targetLanguage,
      context: `${productName} product description`
    }),
    translateText({
      text: detailedDescription,
      targetLanguage,
      context: `${productName} detailed product description`
    })
  ]);

  return {
    description: translatedDescription.translatedText,
    detailedDescription: translatedDetailedDescription.translatedText
  };
}

export function getSupportedLanguages() {
  return supportedLanguages;
}