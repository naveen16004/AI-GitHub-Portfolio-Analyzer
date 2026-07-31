// src/services/aiService.ts
import { GoogleGenAI } from '@google/genai';
import { config } from '../config.js';

export interface ProfileScores {
  overallScore: number;
  developerTier: string;
  scores: {
    documentation: number;
    codeQuality: number;
    impact: number;
    consistency: number;
    diversity: number;
  };
  summary: string;
}

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

  async evaluateRecruiterScore(profileData: any, reposData: any[]): Promise<ProfileScores> {
    const systemInstruction = `You are a Senior Technical Recruiter evaluating a GitHub portfolio. 
Analyze the user's repos and metrics. Output valid JSON ONLY matching this exact interface:
{
  "overallScore": number (0-100),
  "developerTier": string (e.g. "Junior Developer", "Mid-Level Engineer", "TypeScript Wizard"),
  "scores": {
    "documentation": number (0-100),
    "codeQuality": number (0-100),
    "impact": number (0-100),
    "consistency": number (0-100),
    "diversity": number (0-100)
  },
  "summary": string (2 sentence recruiter summary)
}`;

    const prompt = `User Bio & Stats: ${JSON.stringify(profileData)}
Repositories: ${JSON.stringify(reposData)}`;

    const rawResponse = await this.generateText(prompt, systemInstruction);
    const cleaned = rawResponse.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  }
}