import { Request, Response } from 'express';
import { PoolingService } from '../../../core/application/services/PoolingService';

export class PoolingController {
    private poolingService: PoolingService;

    constructor(poolingService: PoolingService) {
        this.poolingService = poolingService;
    }

    createPool(req: Request, res: Response) {
        const { year, members } = req.body;
        try {
            const pool = this.poolingService.createPool(year, members);
            res.json(pool.props);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
