package de.niklas.apijava.dto.order;

public record OrderResponseDTO(
        String customerId,
        int totalOrders,
        double amount,
        double avg
) {
}
