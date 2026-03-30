import OpenAI from 'openai';
import { TicketAnalysis } from '../types/ticketAnalysis';

export class AnalyzerService {
    private openaiClient: OpenAI;

    constructor(openaiClient: OpenAI) {
        this.openaiClient = openaiClient;
    }

    public async analyzeTicket(message: string): Promise<TicketAnalysis> {
        const completion = await this.openaiClient.chat.completions.create({
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
                                description: 'The category of the support ticket.'
                            },
                            priority: {
                                type: 'string',
                                enum: ['low', 'medium', 'high'],
                                description: 'The priority level based on urgency.'
                            },
                            sentiment: {
                                type: 'string',
                                enum: ['happy', 'neutral', 'angry'],
                                description: 'The customer\'s current sentiment.'
                            },
                            summary: {
                                type: 'string',
                                description: 'A 1-sentence summary of the ticket.'
                            },
                            requires_human: {
                                type: 'boolean',
                                description: 'Set to true if human intervention is required, e.g. for angry customers or complex technical issues.'
                            }
                        },
                        required: ['category', 'priority', 'sentiment', 'summary', 'requires_human'],
                        additionalProperties: false
                    }
                }
            }
        });

        const analysisString = completion.choices[0].message.content;
        
        if (!analysisString) {
             throw new Error('No content returned from OpenAI');
        }

        return JSON.parse(analysisString) as TicketAnalysis;
    }
}
