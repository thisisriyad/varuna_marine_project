import { Route, RouteProps } from '../../../core/domain/entities/Route';
import { RouteRepository } from '../../../core/ports/RouteRepository';

export class InMemoryRouteRepository implements RouteRepository {
    private routes: Map<string, Route> = new Map();

    constructor() {
        this.seed();
    }

    private seed() {
        const seedData: RouteProps[] = [
            { id: '1', routeId: 'R001', vesselType: 'Container', fuelType: 'HFO', year: 2024, ghgIntensity: 91.0, fuelConsumption: 5000, distance: 10000, isBaseline: false },
            { id: '2', routeId: 'R002', vesselType: 'BulkCarrier', fuelType: 'LNG', year: 2024, ghgIntensity: 88.0, fuelConsumption: 4800, distance: 9000, isBaseline: false },
            { id: '3', routeId: 'R003', vesselType: 'Tanker', fuelType: 'MGO', year: 2024, ghgIntensity: 93.5, fuelConsumption: 5100, distance: 9500, isBaseline: false },
            { id: '4', routeId: 'R004', vesselType: 'RoRo', fuelType: 'HFO', year: 2025, ghgIntensity: 89.2, fuelConsumption: 4900, distance: 8000, isBaseline: false },
            { id: '5', routeId: 'R005', vesselType: 'Container', fuelType: 'LNG', year: 2025, ghgIntensity: 90.5, fuelConsumption: 4950, distance: 8500, isBaseline: false },
        ];

        seedData.forEach(props => {
            this.routes.set(props.id, new Route(props));
        });
    }

    async findAll(): Promise<Route[]> {
        return Array.from(this.routes.values());
    }

    async findById(id: string): Promise<Route | null> {
        return this.routes.get(id) || null;
    }

    async save(route: Route): Promise<void> {
        this.routes.set(route.id, route);
    }

    async findBaseline(): Promise<Route | null> {
        const routes = await this.findAll();
        return routes.find(r => r.isBaseline) || null;
    }
}
