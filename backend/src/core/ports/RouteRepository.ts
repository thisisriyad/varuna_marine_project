import { Route } from '../../domain/entities/Route';

export interface RouteRepository {
    findAll(): Promise<Route[]>;
    findById(id: string): Promise<Route | null>;
    save(route: Route): Promise<void>;
    findBaseline(): Promise<Route | null>;
}
