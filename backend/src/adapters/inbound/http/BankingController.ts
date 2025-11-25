import { Request, Response } from 'express';
import { BankingService } from '../../../core/application/services/BankingService';

export class BankingController {
    private bankingService: BankingService;

    constructor(bankingService: BankingService) {
        this.bankingService = bankingService;
    }

    bank(req: Request, res: Response) {
        const { shipId, amount } = req.body;
        try {
            this.bankingService.bank(shipId, amount);
            res.json({ success: true, balance: this.bankingService.getBalance(shipId) });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    apply(req: Request, res: Response) {
        const { shipId, amount } = req.body;
        try {
            const remaining = this.bankingService.apply(shipId, amount);
            res.json({ success: true, remaining });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    getBalance(req: Request, res: Response) {
        const { shipId } = req.query;
        if (typeof shipId !== 'string') {
            return res.status(400).json({ error: 'shipId is required' });
        }
        const balance = this.bankingService.getBalance(shipId);
        res.json({ balance });
    }
}
