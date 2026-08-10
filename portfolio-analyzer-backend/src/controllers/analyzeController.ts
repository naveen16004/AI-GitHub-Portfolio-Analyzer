// src/controllers/analyzeController.ts
import { Request, Response } from 'express';
import { GitHubService } from '../services/githubService.js';
import { AIService } from '../services/aiService.js';

const githubService = new GitHubService();
const aiService = new AIService();

export async function analyzeProfile(req: Request, res: Response) {
  const usernameParam = req.params.username;
  const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam;

  if (!username) {
    res.status(400).json({ error: 'Username is required' });
    return;
  }

  try {
    console.log(`🔍 Fetching GitHub data for: ${username}`);
    const [profile, repos] = await Promise.all([
      githubService.getUserProfile(username),
      githubService.getUserRepositories(username),
    ]);

    console.log(`🤖 Running AI analysis engine for: ${username}`);
    const [scores, roast, roadmap] = await Promise.all([
      aiService.evaluateRecruiterScore(profile, repos),
      aiService.generateRoast(profile, repos),
      aiService.generateRoadmap(profile, repos),
    ]);

    res.json({
      success: true,
      data: {
        profile,
        repos,
        analysis: {
          scores,
          roast,
          roadmap,
        },
      },
    });
  } catch (error) {
    console.error(`❌ Analysis failed:`, error);
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
}