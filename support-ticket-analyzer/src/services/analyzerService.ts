import { TicketAnalysis } from '../types/ticketAnalysis';
import { ILlmProvider } from '../utils/interfaces/ILlmProvider';

export class AnalyzerService {
    private llmProvider: ILlmProvider;

    constructor(llmProvider: ILlmProvider) {
        this.llmProvider = llmProvider;
    }

    public async analyzeTicket(message: string): Promise<TicketAnalysis> {
        // You can easily plug in logging or DB logic here later.
        // It delegates LLM reasoning directly to the provided provider.
        return this.llmProvider.analyzeTicket(message);
    }
}
