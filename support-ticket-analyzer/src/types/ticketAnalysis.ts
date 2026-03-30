export interface TicketAnalysis {
    category: 'billing' | 'technical' | 'account' | 'general';
    priority: 'low' | 'medium' | 'high';
    sentiment: 'happy' | 'neutral' | 'angry';
    summary: string;
    requires_human: boolean;
}
