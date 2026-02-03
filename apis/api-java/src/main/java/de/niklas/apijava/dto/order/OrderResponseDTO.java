package de.niklas.apijava.dto.order;

/**
 * Response-Daten für die Aggregation von Bestellungen
 * @param customerId
 * @param totalOrders
 * @param amount
 * @param avg
 */
public record OrderResponseDTO(
        String customerId,
        int totalOrders,
        double amount,
        double avg
) {
}
