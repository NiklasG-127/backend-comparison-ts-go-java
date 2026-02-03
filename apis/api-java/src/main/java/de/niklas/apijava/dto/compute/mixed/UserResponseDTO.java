package de.niklas.apijava.dto.compute.mixed;

/**
 * Response-Daten eines Benutzers
 * @param id
 * @param name
 * @param hashedPassword
 * @param scores
 * @param highestPrime
 */
public record UserResponseDTO(
        String id,
        String name,
        String hashedPassword,
        int[] scores,
        int highestPrime
) {
}
