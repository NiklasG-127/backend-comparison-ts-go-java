package de.niklas.apijava.service;

import de.niklas.apijava.dto.order.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * OrderService kapselt die Logik zur Aggregation von Bestellungen
 */
@Service
public class OrderService {

    /**
     * Aggregiert die bezahlten Bestellungen pro Kunde
     * <p>
     * Für jeden Kunden werden Anzahl, Gesamtsumme sowie durchschnittlicher Betrag der Bestellungen berechnet
     * </p>
     * @param orders Eingabebestellungen (nur {@link STATUSENUM#PAID} werden berücksichtigt)
     * @return Aggregation pro Kunden als {@link OrderAggregateResponseDTO}
     */
    public OrderAggregateResponseDTO aggregateOrders(OrderRequestDTO[] orders) {
        Map<String, OrderResponseDTO> map = new HashMap<>();

        for (OrderRequestDTO order : orders) {
            if (order.status() != STATUSENUM.PAID) continue;

            OrderResponseDTO entry = map.get(order.customerId());
            if (entry == null) {
                entry = new OrderResponseDTO(order.customerId(), 0,0,0);
            }
            int newTotal = entry.totalOrders() +1;
            double newAmount = entry.amount() + order.amount();
            double newAvg = newAmount / newTotal;

            OrderResponseDTO updated = new OrderResponseDTO(order.customerId(), newTotal, newAmount, newAvg);
            map.put(order.customerId(), updated);
        }
        List<OrderResponseDTO> output = new ArrayList<>(map.values());
        output.sort((a, b) -> a.customerId().compareTo(b.customerId()));
        OrderResponseDTO[] customerArray = output.toArray(new OrderResponseDTO[0]);
        return new OrderAggregateResponseDTO(customerArray);
    }
}
