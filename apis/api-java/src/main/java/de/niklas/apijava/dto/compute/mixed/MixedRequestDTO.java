package de.niklas.apijava.dto.compute.mixed;

/**
 * Request-Daten mit Benutzern als {@link UserRequestDTO}
 * @param users
 */
public record MixedRequestDTO (
        UserRequestDTO[] users
){
}
