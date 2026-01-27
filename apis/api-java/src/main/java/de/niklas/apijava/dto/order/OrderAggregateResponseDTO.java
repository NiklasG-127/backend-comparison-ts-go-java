package de.niklas.apijava.dto.order;

public record OrderAggregateResponseDTO(
        OrderResponseDTO[] customers
) {
}
