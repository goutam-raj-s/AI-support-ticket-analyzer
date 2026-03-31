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
                        content: `
                            You are a strict JSON generator for support ticket analysis.

                            Analyze the given support ticket message and return ONLY a valid JSON object.

                            Rules:
                            - Output ONLY valid JSON. Do not include any explanations, text, or markdown.
                            - Follow the provided JSON schema strictly.
                            - Do not add extra fields or omit required fields.
                            - Use only the allowed enum values for each field.
                            - Ensure "summary" is exactly one concise sentence.
                            - Set "requires_human" to true for angry users or complex issues, otherwise false.

                            If unsure, make the best reasonable classification but still return valid JSON.
                           `.trim(),
                    },
                    {
                        role: 'user',
                        content: `Analyze this support ticket:\n\n${message}`,
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