package de.niklas.apijava.dto.compute.sort;

/**
 * Response-Daten mit dem sortierten Array von Zahlen
 * @param sorted
 */
public record SortResponseDTO(
        int[] sorted
) {
}
