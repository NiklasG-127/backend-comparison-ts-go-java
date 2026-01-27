package de.niklas.apijava.dto.compute.hashing;

public record HashRequestDTO(
        String toBeHashed,
        int iterations
) {
}
