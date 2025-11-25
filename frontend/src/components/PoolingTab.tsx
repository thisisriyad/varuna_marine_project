import React, { useState } from 'react';

export const PoolingTab: React.FC = () => {
    const [year, setYear] = useState(2025);
    const [membersInput, setMembersInput] = useState('');
    const [poolResult, setPoolResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleCreatePool = async () => {
        try {
            // Parse members input: "shipId,cb\nshipId,cb"
            const members = membersInput.split('\n').map(line => {
                const [shipId, cb] = line.split(',');
                return { shipId: shipId.trim(), cb: Number(cb.trim()) };
            });

            const res = await fetch('http://localhost:3000/pools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ year, members }),
            });
            const data = await res.json();

            if (data.error) {
                setError(data.error);
                setPoolResult(null);
            } else {
                setPoolResult(data);
                setError('');
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Pooling</h2>
            <div>
                <label className="block text-sm font-medium">Year</label>
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="border p-2 rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Members (shipId, cb) - one per line</label>
                <textarea
                    className="border p-2 rounded w-full h-32"
                    placeholder="ShipA, 100&#10;ShipB, -50"
                    value={membersInput}
                    onChange={(e) => setMembersInput(e.target.value)}
                />
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleCreatePool}>
                Create Pool
            </button>

            {error && <div className="text-red-500">{error}</div>}

            {poolResult && (
                <div className="mt-4 border p-4 rounded bg-gray-50">
                    <h3 className="font-bold">Pool Created</h3>
                    <p>ID: {poolResult.id}</p>
                    <table className="min-w-full mt-2">
                        <thead>
                            <tr>
                                <th className="text-left">Ship ID</th>
                                <th className="text-left">CB Before</th>
                                <th className="text-left">CB After</th>
                            </tr>
                        </thead>
                        <tbody>
                            {poolResult.members.map((m: any) => (
                                <tr key={m.shipId}>
                                    <td>{m.shipId}</td>
                                    <td>{m.cbBefore}</td>
                                    <td>{m.cbAfter}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
