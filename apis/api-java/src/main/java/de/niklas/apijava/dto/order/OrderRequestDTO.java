package de.niklas.apijava.dto.order;

/**
 * Request-Daten für die Aggregation von Bestellungen
 * @param id
 * @param customerId
 * @param amount
 * @param status
 */
public record OrderRequestDTO(
        String id,
        String customerId,
        double amount,
        STATUSENUM status
) {
}
