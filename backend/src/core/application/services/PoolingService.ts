import { Pool } from '../../domain/entities/Pool';

export class PoolingService {
    private pools: Pool[] = [];

    createPool(year: number, members: { shipId: string, cb: number }[]): Pool {
        if (!Pool.validate(members)) {
            throw new Error('Pool validation failed: Total CB must be >= 0');
        }

        // Greedy allocation: Sort by CB desc
        const sortedMembers = [...members].sort((a, b) => b.cb - a.cb);

        // Logic to distribute surplus to deficits could be complex, 
        // but for this assignment, we just need to ensure the pool is valid 
        // and return the final state. 
        // The requirement says: "Deficit ship cannot exit worse", "Surplus ship cannot exit negative".
        // A simple valid state is that everyone shares the pool average, or 
        // surpluses cover deficits exactly.

        // Let's implement a simple distribution where surpluses pay off deficits.
        let surplusShips = sortedMembers.filter(m => m.cb > 0);
        let deficitShips = sortedMembers.filter(m => m.cb < 0);

        // This is a simplified logic. In reality, we'd track transfers.
        // For the purpose of the API response "cb_after", if the pool is valid,
        // we can say everyone is compliant (0) or has some surplus left?
        // Actually, the requirement says "Return cb_after per member".

        // Let's just calculate the pool total. If >= 0, the pool is valid.
        // We can assign the total surplus pro-rata or just leave it?
        // The prompt says "Greedy allocation: Transfer surplus to deficits".

        const finalMembers = members.map(m => ({
            shipId: m.shipId,
            cbBefore: m.cb,
            cbAfter: m.cb // Placeholder, would need actual reallocation logic
        }));

        // Actual greedy allocation logic:
        // 1. Take surplus from top.
        // 2. Give to bottom.

        let availableSurplus = members.filter(m => m.cb > 0).reduce((sum, m) => sum + m.cb, 0);

        // We need to modify 'finalMembers' in place or create new array.
        // Let's do a proper pass.

        const resultMembers = members.map(m => ({ ...m, cbAfter: m.cb }));

        // Sort deficits (most negative first)
        const deficits = resultMembers.filter(m => m.cb < 0).sort((a, b) => a.cb - b.cb);
        // Sort surpluses (most positive first)
        const surpluses = resultMembers.filter(m => m.cb > 0).sort((a, b) => b.cb - a.cb);

        let surplusIdx = 0;

        for (const deficit of deficits) {
            let needed = -deficit.cbAfter;
            while (needed > 0 && surplusIdx < surpluses.length) {
                const giver = surpluses[surplusIdx];
                const canGive = giver.cbAfter; // Assuming they can give all down to 0

                const transfer = Math.min(needed, canGive);

                giver.cbAfter -= transfer;
                deficit.cbAfter += transfer;
                needed -= transfer;

                if (giver.cbAfter === 0) {
                    surplusIdx++;
                }
            }
        }

        const pool = new Pool({
            id: Math.random().toString(36).substring(7),
            year,
            members: resultMembers.map(m => ({
                shipId: m.shipId,
                cbBefore: m.cb,
                cbAfter: m.cbAfter
            }))
        });

        this.pools.push(pool);
        return pool;
    }
}
