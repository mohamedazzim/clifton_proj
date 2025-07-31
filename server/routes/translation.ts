import { Router } from 'express';
import { translateText, translateProductDescription, getSupportedLanguages } from '../services/translationService.js';

const router = Router();

// Get supported languages
router.get('/languages', (req, res) => {
  try {
    const languages = getSupportedLanguages();
    res.json({ languages });
  } catch (error) {
    console.error('Error getting supported languages:', error);
    res.status(500).json({ error: 'Failed to get supported languages' });
  }
});

// Translate general text
router.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage, context } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ error: 'Text and target language are required' });
    }

    const result = await translateText({
      text,
      targetLanguage,
      context
    });

    res.json(result);
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Translation failed' 
    });
  }
});

// Translate product descriptions
router.post('/translate-product', async (req, res) => {
  try {
    const { productName, description, detailedDescription, targetLanguage } = req.body;

    if (!productName || !description || !detailedDescription || !targetLanguage) {
      return res.status(400).json({ 
        error: 'Product name, description, detailed description, and target language are required' 
      });
    }

    const result = await translateProductDescription(
      productName,
      description,
      detailedDescription,
      targetLanguage
    );

    res.json(result);
  } catch (error) {
    console.error('Product translation error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Product translation failed' 
    });
  }
});

export default router;