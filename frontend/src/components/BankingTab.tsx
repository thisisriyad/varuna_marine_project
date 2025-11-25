import React, { useState } from 'react';

export const BankingTab: React.FC = () => {
    const [shipId, setShipId] = useState('');
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState<number | null>(null);
    const [message, setMessage] = useState('');

    const fetchBalance = async () => {
        if (!shipId) return;
        const res = await fetch(`http://localhost:3000/banking/records?shipId=${shipId}`);
        const data = await res.json();
        setBalance(data.balance);
    };

    const handleBank = async () => {
        const res = await fetch('http://localhost:3000/banking/bank', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ shipId, amount }),
        });
        const data = await res.json();
        if (data.success) {
            setMessage(`Banked successfully. New balance: ${data.balance}`);
            setBalance(data.balance);
        } else {
            setMessage(`Error: ${data.error}`);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Banking</h2>
            <div className="flex space-x-2">
                <input
                    className="border p-2 rounded"
                    placeholder="Ship ID"
                    value={shipId}
                    onChange={(e) => setShipId(e.target.value)}
                />
                <button className="bg-gray-200 px-4 py-2 rounded" onClick={fetchBalance}>Check Balance</button>
            </div>

            {balance !== null && <div className="text-lg">Current Balance: {balance} gCO2eq</div>}

            <div className="flex space-x-2 items-center">
                <input
                    type="number"
                    className="border p-2 rounded"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleBank}>Bank Surplus</button>
            </div>
            {message && <div className="text-sm text-gray-700">{message}</div>}
        </div>
    );
};
