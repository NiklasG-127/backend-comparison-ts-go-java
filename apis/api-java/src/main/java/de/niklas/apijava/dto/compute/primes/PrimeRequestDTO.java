package de.niklas.apijava.dto.compute.primes;

/**
 * Request-Daten mit einem Limit für den Primzahl-Endpunkt
 * @param limit
 */
public record PrimeRequestDTO(
        int limit
) {
}
