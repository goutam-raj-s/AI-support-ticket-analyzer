import OpenAI from 'openai';
import { ENV } from './env';

export const openaiClient = new OpenAI({
    apiKey: ENV.OPENAI_API_KEY,
});
