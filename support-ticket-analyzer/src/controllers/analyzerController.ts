import { Request, Response, NextFunction } from 'express';
import { AnalyzerService } from '../services/analyzerService';
import { SuccessResponse, ErrorResponse } from '../utils/apiResponse';

export class AnalyzerController {
    private analyzerService: AnalyzerService;

    constructor(analyzerService: AnalyzerService) {
        this.analyzerService = analyzerService;
    }

    public analyzeSupportTicket = async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const { message } = req.body;

            if (!message || typeof message !== 'string') {
                return ErrorResponse(res, 400, {
                    message: 'Please provide a valid support "message" in the request body.'
                });
            }

            const analysis = await this.analyzerService.analyzeTicket(message);

            return SuccessResponse(res, 200, {
                message: 'Ticket analyzed successfully',
                data: analysis
            });

        } catch (error) {
            next(error);
        }
    };
}
