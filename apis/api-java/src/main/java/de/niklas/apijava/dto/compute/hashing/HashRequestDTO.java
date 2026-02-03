package de.niklas.apijava.dto.compute.hashing;

/**
 * Request-Daten für den Hashing-Endpunkt
 * @param toBeHashed
 * @param iterations
 */
public record HashRequestDTO(
        String toBeHashed,
        int iterations
) {
}
