# ⚡ GitHub Portfolio Analyzer & Roast Engine

An AI-powered developer evaluation platform that analyzes GitHub profiles, calculates recruiter-grade readiness scores across 5 core dimensions, generates witty profile roasts, and provides personalized career roadmaps.

---

## ✨ Features

- **📊 Recruiter Scoring Engine:** Scores profiles (0–100) and assigns a developer tier based on **Documentation**, **Code Quality**, **Impact**, **Consistency**, and **Stack Diversity**.
- **🔥 Brutal Profile Roast:** Generates a humorous, sharp critique of a developer's profile based on repo names, missing descriptions, and activity patterns.
- **🗺️ Personal Learning Roadmap:** Recommends 3 concrete project ideas and tech stack additions to level up the candidate's portfolio.
- **⚡ In-Memory Caching:** Built-in TTL caching layer to prevent API rate limits and deliver lightning-fast responses on repeated checks.
- **🛡️ Rate-Limit Optimized:** Powered by Octokit with Personal Access Token authentication for high-throughput GitHub queries.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **AI Orchestration:** `@google/genai` (Gemini 2.5 Flash)
- **GitHub Integration:** `@octokit/rest`
- **Development Tools:** `tsx`, `dotenv`, `cors`

---

## 🏗️ Project Architecture

github-portfolio-analyzer/
├── src/
│   ├── config.ts                 # Environment variable loader
│   ├── test-cli.ts               # CLI test script for rapid API testing
│   ├── index.ts                  # Express server entry point
│   ├── controllers/
│   │   └── analyzeController.ts  # API route orchestration & caching handler
│   └── services/
│       ├── githubService.ts      # GitHub Octokit API fetcher
│       ├── aiService.ts          # Gemini AI scoring, roast, and roadmap prompts
│       └── cacheService.ts       # In-memory TTL cache
├── .env.example
├── package.json
└── tsconfig.json

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have **Node.js (v18+)** and **npm** installed on your system.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone [https://github.com/naveen16004/github-portfolio-analyzer.git](https://github.com/naveen16004/github-portfolio-analyzer.git)
cd github-portfolio-analyzer
npm install
```
3. Environment Configuration
Create a .env file in the root directory:
```
PORT=5005
GITHUB_TOKEN=your_github_personal_access_token_here
GEMINI_API_KEY=your_gemini_api_key_here
```
4. Running the Application
Development Mode (Hot Reload):
```
npm run dev
```
CLI Integration Test:

Bash
```
npm run test:cli
```
Production Build:
```
npm run build
npm start
```
API Reference
Analyze GitHub Profile
```
GET /api/analyze/:username
```
Sample Response:
```
{
  "success": true,
  "cached": false,
  "data": {
    "profile": {
      "login": "naveen16004",
      "publicRepos": 12,
      "followers": 15
    },
    "analysis": {
      "scores": {
        "overallScore": 88,
        "developerTier": "TypeScript Wizard",
        "scores": {
          "documentation": 80,
          "codeQuality": 90,
          "impact": 85,
          "consistency": 92,
          "diversity": 85
        },
        "summary": "Strong core developer with consistent commit habits across modern full-stack web technologies."
      },
      "roast": "Your repos have fewer readmes than a silent film, but at least your TypeScript types are tighter than your git commit messages...",
      "roadmap": [
        "Add Docker containerization to Express backend repos.",
        "Implement end-to-end integration test suites using Playwright.",
        "Set up GitHub Actions CI/CD pipelines for automated testing."
      ]
    }
  }
}
```

