import React from 'react';

interface Route {
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

interface Props {
    routes: Route[];
    onSetBaseline: (id: string) => void;
}

export const RoutesTable: React.FC<Props> = ({ routes, onSetBaseline }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vessel Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GHG Intensity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumption (t)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {routes.map((route) => (
                        <tr key={route.id} className={route.isBaseline ? 'bg-blue-50' : ''}>
                            <td className="px-6 py-4 whitespace-nowrap">{route.routeId}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{route.vesselType}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{route.fuelType}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{route.year}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{route.ghgIntensity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{route.fuelConsumption}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => onSetBaseline(route.id)}
                                    className={`px-3 py-1 rounded text-sm ${route.isBaseline
                                            ? 'bg-green-500 text-white cursor-default'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                    disabled={route.isBaseline}
                                >
                                    {route.isBaseline ? 'Baseline' : 'Set Baseline'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
