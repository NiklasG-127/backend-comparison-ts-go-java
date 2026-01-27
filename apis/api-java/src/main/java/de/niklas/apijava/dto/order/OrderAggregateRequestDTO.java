package de.niklas.apijava.dto.order;

public record OrderAggregateRequestDTO(
        OrderRequestDTO[] orders
) {
}
