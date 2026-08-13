// src/controllers/analyzeController.ts
import { Request, Response } from 'express';
import { GitHubService } from '../services/githubService.js';
import { AIService } from '../services/aiService.js';
import { globalCache } from '../services/cacheService.js';

const githubService = new GitHubService();
const aiService = new AIService();

export async function analyzeProfile(req: Request, res: Response) {
  const usernameParam = req.params.username;
  const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam;

  if (!username) {
    res.status(400).json({ error: 'Username is required' });
    return;
  }

  // 1. Check cache first
  const cacheKey = `analysis:${username.toLowerCase()}`;
  const cachedData = globalCache.get(cacheKey);
  if (cachedData) {
    console.log(`⚡ Returning cached analysis for: ${username}`);
    res.json({ success: true, cached: true, data: cachedData });
    return;
  }

  try {
    console.log(`🔍 Fetching GitHub data for: ${username}`);
    const [profile, repos] = await Promise.all([
      githubService.getUserProfile(username),
      githubService.getUserRepositories(username),
    ]);

    if (!repos || repos.length === 0) {
      res.status(404).json({
        success: false,
        error: 'No public non-fork repositories found for this user.',
      });
      return;
    }

    console.log(`🤖 Running AI analysis engine for: ${username}`);
    const [scores, roast, roadmap] = await Promise.all([
      aiService.evaluateRecruiterScore(profile, repos),
      aiService.generateRoast(profile, repos),
      aiService.generateRoadmap(profile, repos),
    ]);

    const responsePayload = {
      profile,
      repos,
      analysis: {
        scores,
        roast,
        roadmap,
      },
    };

    // Save result to cache
    globalCache.set(cacheKey, responsePayload);

    res.json({
      success: true,
      cached: false,
      data: responsePayload,
    });
  } catch (error) {
    console.error(`❌ Analysis failed:`, error);
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
}