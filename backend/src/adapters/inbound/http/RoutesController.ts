import { Request, Response } from 'express';
import { RouteRepository } from '../../../core/ports/RouteRepository';
import { CalculateCompliance } from '../../../core/application/use-cases/CalculateCompliance';

export class RoutesController {
    private routeRepository: RouteRepository;
    private calculateCompliance: CalculateCompliance;

    constructor(routeRepository: RouteRepository) {
        this.routeRepository = routeRepository;
        this.calculateCompliance = new CalculateCompliance(routeRepository);
    }

    async getAllRoutes(req: Request, res: Response) {
        const routes = await this.routeRepository.findAll();
        res.json(routes.map(r => r.props));
    }

    async setBaseline(req: Request, res: Response) {
        const { id } = req.params;
        const routes = await this.routeRepository.findAll();

        // Reset all baselines
        for (const route of routes) {
            if (route.isBaseline) {
                route.setBaseline(false);
                await this.routeRepository.save(route);
            }
        }

        const route = await this.routeRepository.findById(id);
        if (!route) {
            return res.status(404).json({ error: 'Route not found' });
        }

        route.setBaseline(true);
        await this.routeRepository.save(route);
        res.json(route.props);
    }

    async getComparison(req: Request, res: Response) {
        const baseline = await this.routeRepository.findBaseline();
        if (!baseline) {
            return res.status(400).json({ error: 'No baseline set' });
        }

        const routes = await this.routeRepository.findAll();
        const comparison = routes.map(route => {
            const percentDiff = ((route.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
            const compliant = route.ghgIntensity <= 89.3368; // Target 2025
            return {
                ...route.props,
                percentDiff,
                compliant
            };
        });

        res.json(comparison);
    }

    async getCompliance(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await this.calculateCompliance.execute(id);
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}
