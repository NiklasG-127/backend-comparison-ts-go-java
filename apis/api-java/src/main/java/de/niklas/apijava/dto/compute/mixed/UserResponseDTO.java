package de.niklas.apijava.dto.compute.mixed;

public record UserResponseDTO(
        String id,
        String name,
        String hashedPassword,
        int[] scores,
        int highestPrime
) {
}
