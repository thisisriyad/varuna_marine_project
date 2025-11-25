import React from 'react';

interface ComparisonData {
    routeId: string;
    ghgIntensity: number;
    percentDiff: number;
    compliant: boolean;
}

interface Props {
    data: ComparisonData[];
}

export const ComplianceChart: React.FC<Props> = ({ data }) => {
    const maxIntensity = Math.max(...data.map(d => d.ghgIntensity)) * 1.1;

    return (
        <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold mb-4">Compliance Comparison</h3>
            <div className="flex items-end space-x-4 h-64 border-b border-gray-200 pb-2">
                {data.map((item) => (
                    <div key={item.routeId} className="flex flex-col items-center flex-1">
                        <div
                            className={`w-full max-w-[50px] transition-all duration-500 ${item.compliant ? 'bg-green-500' : 'bg-red-500'
                                }`}
                            style={{ height: `${(item.ghgIntensity / maxIntensity) * 100}%` }}
                        ></div>
                        <span className="text-xs mt-2">{item.routeId}</span>
                        <span className="text-xs font-bold">{item.ghgIntensity.toFixed(1)}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <div className="text-sm text-gray-600">Target: 89.3 gCO2eq/MJ</div>
            </div>
        </div>
    );
};
