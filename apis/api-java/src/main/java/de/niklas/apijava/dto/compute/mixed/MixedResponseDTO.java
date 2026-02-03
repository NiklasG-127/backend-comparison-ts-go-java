package de.niklas.apijava.dto.compute.mixed;

/**
 * Response-Daten mit den Benutzern als {@link UserResponseDTO}
 * @param userOutput
 */
public record MixedResponseDTO(
        UserResponseDTO[] userOutput
) {
}
