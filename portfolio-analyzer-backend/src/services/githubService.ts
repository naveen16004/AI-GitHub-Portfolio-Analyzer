// src/services/githubService.ts
import { Octokit } from '@octokit/rest';
import { config } from '../config.js';

export const octokit = new Octokit({
  auth: config.githubToken || undefined,
});

export class GitHubService {
  async getUserProfile(username: string) {
    try {
      const { data } = await octokit.users.getByUsername({ username });
      return {
        login: data.login,
        name: data.name,
        bio: data.bio,
        avatarUrl: data.avatar_url,
        publicRepos: data.public_repos,
        followers: data.followers,
        following: data.following,
        createdAt: data.created_at,
      };
    } catch (error) {
      throw new Error(`[GitHubService] Error fetching user profile: ${(error as Error).message}`);
    }
  }
}