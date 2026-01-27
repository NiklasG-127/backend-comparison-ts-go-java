package de.niklas.apijava.dto.compute.mixed;

public record UserRequestDTO(
        String name,
        String password,
        int[] scores,
        int limit,
        int iterations
) {
}
