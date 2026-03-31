import OpenAI from 'openai';
import { TicketAnalysis } from '../types/ticketAnalysis';
import { ILlmProvider } from '../utils/interfaces/ILlmProvider';

export class OpenAiProvider implements ILlmProvider {
    private client: OpenAI;

    constructor(client: OpenAI) {
        this.client = client;
    }

    public async analyzeTicket(message: string): Promise<TicketAnalysis> {
        let completion;

        // API Call (isolated try-catch)
        try {
            completion = await this.client.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert customer support analyzer. Your job is to extract structured information from support tickets.',
                    },
                    {
                        role: 'user',
                        content: `Please analyze the following support ticket message:\n\n${message}`,
                    },
                ],
                response_format: {
                    type: 'json_schema',
                    json_schema: {
                        name: 'support_ticket_analysis',
                        strict: true,
                        schema: {
                            type: 'object',
                            properties: {
                                category: {
                                    type: 'string',
                                    enum: ['billing', 'technical', 'account', 'general'],
                                },
                                priority: {
                                    type: 'string',
                                    enum: ['low', 'medium', 'high'],
                                },
                                sentiment: {
                                    type: 'string',
                                    enum: ['happy', 'neutral', 'angry'],
                                },
                                summary: {
                                    type: 'string',
                                },
                                requires_human: {
                                    type: 'boolean',
                                }
                            },
                            required: ['category', 'priority', 'sentiment', 'summary', 'requires_human'],
                            additionalProperties: false
                        }
                    }
                }
            });
        } catch (error) {
            throw new Error('LLM_API_CALL_FAILED');
        }

        // 🔹 2. Safe response extraction (no try-catch)
        const content = completion?.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error('LLM_NO_CONTENT');
        }

        // 🔹 3. JSON parsing (separate try-catch)
        try {
            return JSON.parse(content) as TicketAnalysis;
        } catch {
            throw new Error('LLM_JSON_PARSE_FAILED');
        }
    }
}