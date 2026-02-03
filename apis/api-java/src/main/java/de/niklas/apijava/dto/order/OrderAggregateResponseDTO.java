package de.niklas.apijava.dto.order;

/**
 * Response-Array mit den Kunden als {@link OrderResponseDTO}
 * @param customers
 */
public record OrderAggregateResponseDTO(
        OrderResponseDTO[] customers
) {
}
