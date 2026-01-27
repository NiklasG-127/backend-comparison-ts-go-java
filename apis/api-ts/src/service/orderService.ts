import {AggregateOrder, OrderType, STATUS} from "../types/ordersType";

export function aggregateOrderService(data: OrderType[]): AggregateOrder[] {
    // Filtert die Bestellungen nach bereits bezahlten
    const paidOrders: OrderType[] = data.filter(item => item.status === STATUS.PAID);

    // Aggregiert Bestellungen pro Kunden
    const aggregateOrders: AggregateOrder[] = paidOrders.reduce<AggregateOrder[]>((agg: AggregateOrder[], order: OrderType): AggregateOrder[] => {
        // Sucht einen bestehenden Eintrag für den Kunden
        let entry: AggregateOrder | undefined = agg.find(a => a.customerId === order.customerId);
        // Wenn kein Eintrag existiert wird ein neuer erstellt für den Kunden
        if(!entry){
            entry = {
                customerId: order.customerId,
                totalOrders: 0,
                amount: 0,
                avg: 0
            }
            agg.push(entry)
        }
        // Aktualisiert Anzahl der Bestellungen, Gesamtbetrag und Durchschnittsbetrag pro Bestellung
        entry.totalOrders++;
        entry.amount += order.amount;
        entry.avg = entry.amount / entry.totalOrders;

        return agg;
    }, []);
    // Gibt die aggregierten Daten zurück
    return aggregateOrders;
}