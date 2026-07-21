// src/test-cli.ts
import { GitHubService } from './services/githubService.js';
import dotenv from 'dotenv';
dotenv.config();

async function runTest() {
  const testUser = 'naveen16004';
  const service = new GitHubService();

  console.log(`🧪 Testing GitHub data collection for: ${testUser}\n`);

  try {
    const profile = await service.getUserProfile(testUser);
    console.log('✅ PROFILE METRICS FETCHED:');
    console.dir(profile, { depth: null, colors: true });

    const repos = await service.getUserRepositories(testUser);
    console.log(`\n✅ REPOSITORIES DETECTED (${repos.length} original repos found):`);
    console.dir(repos.slice(0, 3), { depth: null, colors: true });
    if (repos.length > 3) console.log(`... and ${repos.length - 3} more repositories.`);

    console.log('\n🎉 Test successful! The connection to the GitHub API is working cleanly.');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

runTest();