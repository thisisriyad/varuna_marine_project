export interface ComplianceBalanceProps {
    shipId: string;
    year: number;
    cb: number; // gCO2eq
}

export class ComplianceBalance {
    props: ComplianceBalanceProps;

    constructor(props: ComplianceBalanceProps) {
        this.props = props;
    }

    get shipId() { return this.props.shipId; }
    get year() { return this.props.year; }
    get cb() { return this.props.cb; }

    add(amount: number) {
        this.props.cb += amount;
    }

    subtract(amount: number) {
        this.props.cb -= amount;
    }
}
