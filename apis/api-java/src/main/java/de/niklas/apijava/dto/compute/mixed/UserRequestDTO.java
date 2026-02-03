package de.niklas.apijava.dto.compute.mixed;

/**
 * Request-Daten eines Benutzers
 * @param name
 * @param password
 * @param scores
 * @param limit
 * @param iterations
 */
public record UserRequestDTO(
        String name,
        String password,
        int[] scores,
        int limit,
        int iterations
) {
}
