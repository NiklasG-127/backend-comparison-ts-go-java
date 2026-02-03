package de.niklas.apijava.dto.compute.primes;

/**
 * Response-Daten für den Primzahl-Endpunkt
 * @param limit
 * @param count
 * @param lastPrime
 */
public record PrimeResponseDTO(
        int limit,
        int count,
        int lastPrime
) {
}
