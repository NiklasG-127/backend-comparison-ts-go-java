package de.niklas.apijava.dto.compute.primes;

public record PrimeResponseDTO(
        int limit,
        int count,
        int lastPrime
) {
}
