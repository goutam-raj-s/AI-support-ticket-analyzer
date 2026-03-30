import { TicketAnalysis } from '../types/ticketAnalysis';
import { ILlmProvider } from '../utils/interfaces/ILlmProvider';

export class AnalyzerService {
    private llmProvider: ILlmProvider;

    constructor(llmProvider: ILlmProvider) {
        this.llmProvider = llmProvider;
    }

    public async analyzeTicket(message: string): Promise<TicketAnalysis> {
        // self defensive validation, although controller may also check it
        if (typeof message !== 'string') {
            throw new Error('INVALID_MESSAGE_TYPE');
        }

        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            throw new Error('EMPTY_MESSAGE');
        }

        if (trimmedMessage.length > 2000) {
            throw new Error('MESSAGE_TOO_LONG');
        }

        const analysis = await this.llmProvider.analyzeTicket(trimmedMessage);

        if (!analysis) {
            throw new Error('LLM_EMPTY_RESPONSE');
        }

        return analysis;
    }
}
