import { Route } from '../../domain/entities/Route';
import { RouteRepository } from '../../ports/RouteRepository';

export class CalculateCompliance {
    private routeRepository: RouteRepository;
    private readonly TARGET_2025 = 89.3368; // gCO2eq/MJ

    constructor(routeRepository: RouteRepository) {
        this.routeRepository = routeRepository;
    }

    async execute(routeId: string): Promise<{ cb: number, energy: number, target: number, actual: number }> {
        const route = await this.routeRepository.findById(routeId);
        if (!route) {
            throw new Error('Route not found');
        }

        const energy = route.energyInScope;
        const actual = route.ghgIntensity;
        const target = this.TARGET_2025;

        // Compliance Balance = (Target - Actual) * Energy
        const cb = (target - actual) * energy;

        return { cb, energy, target, actual };
    }
}
