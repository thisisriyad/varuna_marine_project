export class BankingService {
    private bankedSurplus: Map<string, number> = new Map(); // shipId -> amount

    bank(shipId: string, amount: number) {
        if (amount <= 0) {
            throw new Error('Cannot bank non-positive amount');
        }
        const current = this.bankedSurplus.get(shipId) || 0;
        this.bankedSurplus.set(shipId, current + amount);
    }

    apply(shipId: string, amount: number): number {
        const current = this.bankedSurplus.get(shipId) || 0;
        if (amount > current) {
            throw new Error('Insufficient banked surplus');
        }
        this.bankedSurplus.set(shipId, current - amount);
        return current - amount;
    }

    getBalance(shipId: string): number {
        return this.bankedSurplus.get(shipId) || 0;
    }
}
