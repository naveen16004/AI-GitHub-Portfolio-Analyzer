// src/services/aiService.ts
import { GoogleGenAI } from '@google/genai';
import { config } from '../config.js';

export class AIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
  }

  protected async generateText(prompt: string, systemInstruction?: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: systemInstruction ? { systemInstruction } : undefined,
      });

      return response.text || '';
    } catch (error) {
      throw new Error(`[AIService] Generation error: ${(error as Error).message}`);
    }
  }
}