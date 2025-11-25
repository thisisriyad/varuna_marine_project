export interface PoolMember {
    shipId: string;
    cbBefore: number;
    cbAfter: number;
}

export interface PoolProps {
    id: string;
    year: number;
    members: PoolMember[];
}

export class Pool {
    props: PoolProps;

    constructor(props: PoolProps) {
        this.props = props;
    }

    get id() { return this.props.id; }
    get year() { return this.props.year; }
    get members() { return this.props.members; }

    static validate(members: { shipId: string, cb: number }[]): boolean {
        const totalCb = members.reduce((sum, m) => sum + m.cb, 0);
        return totalCb >= 0;
    }
}
