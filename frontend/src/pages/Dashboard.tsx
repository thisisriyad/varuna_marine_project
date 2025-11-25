import React, { useEffect, useState } from 'react';
import { RoutesTable } from '../components/RoutesTable';
import { ComplianceChart } from '../components/ComplianceChart';
import { BankingTab } from '../components/BankingTab';
import { PoolingTab } from '../components/PoolingTab';

export const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('routes');
    const [routes, setRoutes] = useState([]);
    const [comparisonData, setComparisonData] = useState([]);

    const fetchRoutes = async () => {
        const res = await fetch('http://localhost:3000/routes');
        const data = await res.json();
        setRoutes(data);
    };

    const fetchComparison = async () => {
        const res = await fetch('http://localhost:3000/routes/comparison');
        if (res.ok) {
            const data = await res.json();
            setComparisonData(data);
        } else {
            setComparisonData([]);
        }
    };

    useEffect(() => {
        fetchRoutes();
        if (activeTab === 'compare') {
            fetchComparison();
        }
    }, [activeTab]);

    const handleSetBaseline = async (id: string) => {
        await fetch(`http://localhost:3000/routes/${id}/baseline`, { method: 'POST' });
        fetchRoutes();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">FuelEU Compliance Dashboard</h1>
            </header>

            <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        {['routes', 'compare', 'banking', 'pooling'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } capitalize`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'routes' && (
                        <RoutesTable routes={routes} onSetBaseline={handleSetBaseline} />
                    )}
                    {activeTab === 'compare' && (
                        <div>
                            {comparisonData.length > 0 ? (
                                <>
                                    <ComplianceChart data={comparisonData} />
                                    <div className="mt-8">
                                        <RoutesTable routes={comparisonData} onSetBaseline={handleSetBaseline} />
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    Please set a baseline in the Routes tab first.
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'banking' && <BankingTab />}
                    {activeTab === 'pooling' && <PoolingTab />}
                </div>
            </div>
        </div>
    );
};
