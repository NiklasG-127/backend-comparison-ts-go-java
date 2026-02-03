package de.niklas.apijava.dto.compute.sort;

/**
 * Request-Daten mit einem unsortierten Array von Zahlen
 * @param values
 */
public record SortRequestDTO(
        int[] values
) {
}
