package de.niklas.apijava.dto.health;

/**
 * Response-Daten mit Status für Health Endpunkt
 * @param status
 */
public record StatusResponseDTO(
        String status
) {
}
