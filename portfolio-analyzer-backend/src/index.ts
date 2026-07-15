import express from 'express';
import cors from 'cors';
import { config } from './config.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', message: 'GitHub Portfolio Analyzer API is online!' });
});

app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});