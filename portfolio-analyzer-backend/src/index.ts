// src/index.ts
import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { analyzeProfile } from './controllers/analyzeController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', message: 'GitHub Portfolio Analyzer API is online!' });
});

// Main analysis route
app.get('/api/analyze/:username', analyzeProfile);

app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});