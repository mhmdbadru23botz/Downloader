
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis } from "../types";

export const aiService = {
  analyzeMedia: async (title: string, author: string, platform: string): Promise<AIAnalysis | null> => {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.warn("⚠️ API_KEY (Gemini) belum diset. Analisis AI akan dilewati.");
      return null;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Analyze this media content metadata from ${platform}. 
      Title: "${title}"
      Author: "${author}"
      
      Provide a brief summary, a few relevant tags, the overall sentiment, and a 'smart caption' for social media sharing. 
      Output MUST be in Indonesian.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING, description: "A one-sentence summary of the content." },
              tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 relevant hashtags or tags." },
              sentiment: { type: Type.STRING, description: "One word sentiment (e.g., Positif, Inspiratif, Lucu)." },
              smartCaption: { type: Type.STRING, description: "A catchy caption for sharing." },
            },
            required: ["summary", "tags", "sentiment", "smartCaption"],
          },
        },
      });

      const text = response.text;
      if (text) {
        return JSON.parse(text) as AIAnalysis;
      }
      return null;
    } catch (error) {
      console.error("Gemini AI Analysis failed:", error);
      return null;
    }
  }
}; 
