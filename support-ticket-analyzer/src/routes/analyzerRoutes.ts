import { Router } from 'express';
import { AnalyzerController } from '../controllers/analyzerController';
import { AnalyzerService } from '../services/analyzerService';
import { openaiClient } from '../config/openai';
import { OpenAiProvider } from '../providers/OpenAiProvider';

const router = Router();

// Set up the specific LLM Provider (can easily swap OpenAiProvider with AnthropicProvider)
const llmProvider = new OpenAiProvider(openaiClient);

// Inject the generic provider interface down into the service & controller
const analyzerService = new AnalyzerService(llmProvider);
const analyzerController = new AnalyzerController(analyzerService);

router.post('/analyze', analyzerController.analyzeSupportTicket);

export default router;
