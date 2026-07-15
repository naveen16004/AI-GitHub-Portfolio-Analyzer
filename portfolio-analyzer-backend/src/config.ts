// src/config.ts
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.GITHUB_TOKEN) {
  console.warn("⚠️ Warning: GITHUB_TOKEN is not set. API rate limits will be highly restricted (60 req/hr).");
}

export const config = {
  port: process.env.PORT || 5005,
  githubToken: process.env.GITHUB_TOKEN || '',
};