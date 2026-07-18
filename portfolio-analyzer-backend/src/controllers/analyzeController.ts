// src/controllers/analyzeController.ts
import { Request, Response } from 'express';
import { GitHubService } from '../services/githubService.js';

const githubService = new GitHubService();

export async function analyzeProfile(req: Request, res: Response) {
  const usernameParam = req.params.username;
  const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam;

  if (!username) {
    res.status(400).json({ error: 'Username is required' });
    return;
  }

  try {
    console.log(`🔍 Fetching data for GitHub user: ${username}`);
    
    // Fetch profile details and repositories in parallel
    const [profile, repos] = await Promise.all([
      githubService.getUserProfile(username),
      githubService.getUserRepositories(username),
    ]);

    res.json({
      success: true,
      data: {
        profile,
        repos,
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