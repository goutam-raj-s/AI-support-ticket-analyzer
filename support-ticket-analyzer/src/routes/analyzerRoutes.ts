import { Router } from 'express';
import { AnalyzerController } from '../controllers/analyzerController';
import { AnalyzerService } from '../services/analyzerService';
import { openaiClient } from '../config/openai';

const router = Router();
const analyzerService = new AnalyzerService(openaiClient);
const analyzerController = new AnalyzerController(analyzerService);

router.post('/analyze', analyzerController.analyzeSupportTicket);

export default router;
