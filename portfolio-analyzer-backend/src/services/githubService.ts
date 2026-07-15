import { Octokit } from '@octokit/rest';
import { config } from '../config.js';

// Initialize Octokit. If a token is provided, it authenticates; otherwise, it runs unauthenticated.
export const octokit = new Octokit({
  auth: config.githubToken || undefined,
});

export class GitHubService {
  // We will build profile and repository fetching methods inside this class next.
}