import { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export function useAIGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAdVariations = async (productDescription, platform, imageFile) => {
    setIsGenerating(true);
    try {
      // Generate ad copy variations
      const copyPrompt = `Create 5 engaging ${platform} ad copy variations for: ${productDescription}. 
      Each should be optimized for ${platform === 'tiktok' ? 'TikTok (short, punchy, trending)' : 'Instagram (aesthetic, clear CTA)'}.
      Return as a JSON array of objects with "headline" and "description" fields.`;

      const copyResponse = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "user", content: copyPrompt }],
        temperature: 0.8,
      });

      let adVariations;
      try {
        adVariations = JSON.parse(copyResponse.choices[0].message.content);
      } catch {
        // Fallback if JSON parsing fails
        adVariations = [
          { headline: "🔥 New Product Alert!", description: "Don't miss out on this amazing deal. Limited time offer!" },
          { headline: "Transform Your Style", description: "Discover the perfect addition to your collection. Shop now!" },
          { headline: "Trending Now", description: "Join thousands who love this product. Get yours today!" },
          { headline: "Best Seller", description: "See why everyone's talking about this. Free shipping!" },
          { headline: "Exclusive Offer", description: "Special pricing just for you. Don't wait - order now!" }
        ];
      }

      // Create mock image variations (in real app, would use DALL-E or similar)
      const imageVariations = adVariations.map((_, index) => {
        // Mock different creative styles
        const styles = ['modern', 'minimal', 'bold', 'elegant', 'trendy'];
        return {
          url: `https://picsum.photos/400/600?random=${Date.now() + index}`,
          style: styles[index] || 'modern'
        };
      });

      // Combine copy and images
      const results = adVariations.map((copy, index) => ({
        id: `ad-${Date.now()}-${index}`,
        headline: copy.headline,
        description: copy.description,
        imageUrl: imageVariations[index].url,
        platform,
        createdAt: new Date().toISOString(),
        posted: false,
        metrics: {
          impressions: 0,
          likes: 0,
          shares: 0,
          comments: 0
        }
      }));

      return results;
    } catch (error) {
      console.error('Error generating ad variations:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAdVariations,
    isGenerating
  };
}