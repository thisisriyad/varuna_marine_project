export interface RouteProps {
    id: string;
    routeId: string;
    vesselType: string;
    fuelType: string;
    year: number;
    ghgIntensity: number;
    fuelConsumption: number;
    distance: number;
    isBaseline: boolean;
}

export class Route {
    props: RouteProps;

    constructor(props: RouteProps) {
        this.props = props;
    }

    get id() { return this.props.id; }
    get routeId() { return this.props.routeId; }
    get vesselType() { return this.props.vesselType; }
    get fuelType() { return this.props.fuelType; }
    get year() { return this.props.year; }
    get ghgIntensity() { return this.props.ghgIntensity; }
    get fuelConsumption() { return this.props.fuelConsumption; }
    get distance() { return this.props.distance; }
    get isBaseline() { return this.props.isBaseline; }

    setBaseline(isBaseline: boolean) {
        this.props.isBaseline = isBaseline;
    }

    get energyInScope(): number {
        // Energy in scope (MJ) ≈ fuelConsumption (t) × 41 000 MJ/t
        // This is a simplified calculation as per requirements
        return this.props.fuelConsumption * 41000;
    }

    get totalEmissions(): number {
        // Total Emissions (tCO2eq) = (GHG Intensity * Energy) / 1,000,000
        // GHG Intensity is gCO2eq/MJ
        return (this.props.ghgIntensity * this.energyInScope) / 1000000;
    }
}
