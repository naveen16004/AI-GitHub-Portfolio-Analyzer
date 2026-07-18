// src/services/githubService.ts
import { Octokit } from '@octokit/rest';
import { config } from '../config.js';

export const octokit = new Octokit({
  auth: config.githubToken || undefined,
});

export class GitHubService {
  // This is what you added in Commit 4:
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

  // THIS IS THE NEW LINE YOU ARE ADDING FOR COMMIT 5:
  async getUserRepositories(username: string) {
    try {
      const { data: repos } = await octokit.repos.listForUser({
        username,
        sort: 'updated',
        per_page: 50,
      });

      return repos
        .filter((repo) => !repo.fork)
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          updatedAt: repo.updated_at,
          url: repo.html_url,
          size: repo.size,
        }));
    } catch (error) {
      throw new Error(`[GitHubService] Error fetching repositories: ${(error as Error).message}`);
    }
  }
}