package de.niklas.apijava.dto.order;

/**
 * Request-Daten mit den Bestellungen als {@link OrderRequestDTO}
 * @param orders
 */
public record OrderAggregateRequestDTO(
        OrderRequestDTO[] orders
) {
}
