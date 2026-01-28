import {AggregateOrder, OrderType, STATUS} from "../types/ordersType";

export function aggregateOrderService(data: OrderType[]): AggregateOrder[] {
    // Erstellt eine HashMap für schnellen Zugriff auf Orders
    const map = new Map<string, AggregateOrder>();

    // Geht über alle Orders
    for (const order of data) {
        // Ignoriert Orders die nicht bezahlt sind
        if (order.status !== STATUS.PAID) continue;

        // Holt bereits vorhandene Einträge aus der Map bzw. wenn keine vorhanden sind undefined.
        let entry: AggregateOrder | undefined = map.get(order.customerId);
        if(entry === undefined) {
            // Wenn Eintrag undefined, dann wird ein neuer erstellt und mit customerId als Key in die HashMap gesetzt
            entry = { customerId: order.customerId, totalOrders: 0, amount: 0, avg: 0};
            map.set(order.customerId, entry);
        }
        // Attribute des Eintrags werden verändert (Menge erhöht, Betrag erhöht, neuen Avg ausrechnen)
        entry.totalOrders++;
        entry.amount += order.amount;
        entry.avg = entry.amount / entry.totalOrders;
    }
    // Erstellt ein Array aus der HashMap
    const result = Array.from(map.values());

    // Sortiert das Array nach customerIds
    result.sort((a, b) => a.customerId.localeCompare(b.customerId));

    // Gibt das sortierte Array zurück
    return result;
}