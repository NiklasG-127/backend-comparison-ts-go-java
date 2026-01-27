export enum STATUS {
    PAID="PAID",
    CANCELLED="CANCELLED",
    OPEN="OPEN"
}

export type OrderType = {
    id: string;
    customerId: string;
    amount: number;
    status: STATUS;
}

export type AggregateOrder = {
    customerId: string;
    totalOrders: number;
    amount: number;
    avg: number;
}