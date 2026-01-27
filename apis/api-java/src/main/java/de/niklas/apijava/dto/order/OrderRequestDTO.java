package de.niklas.apijava.dto.order;

public record OrderRequestDTO(
        String id,
        String customerId,
        double amount,
        STATUSENUM status
) {
}
