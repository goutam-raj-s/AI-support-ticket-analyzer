import { TicketAnalysis } from '../../types/ticketAnalysis';

export interface ILlmProvider {
    analyzeTicket(message: string): Promise<TicketAnalysis>;
}
