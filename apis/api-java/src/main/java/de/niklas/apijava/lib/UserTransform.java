package de.niklas.apijava.lib;

import de.niklas.apijava.dto.compute.mixed.UserRequestDTO;
import de.niklas.apijava.dto.compute.mixed.UserResponseDTO;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.UUID;

/**
 * UserTransform kapselt die Logik zum Transformieren von Benutzern
 *
 */
@Component
public class UserTransform {
    private final Hasher hasher;
    private final PrimeCalculator primeCalculator;

    /**
     * Erstellt UserTransform mit allen benötigten Abhängigkeiten
     * @param hasher
     * @param primeCalculator
     */
    public UserTransform(Hasher hasher, PrimeCalculator primeCalculator) {
        this.hasher = hasher;
        this.primeCalculator = primeCalculator;
    }

    /**
     * Transformiert einen Benutzer, indem id generiert, passwort gehasht, scores sortiert und Primzahlen berechnet werden
     * @param userRequestDTO eingebender Benutzer
     * @return {@link UserResponseDTO} mit den neuen Werten des transformierten Benutzers
     */
    public UserResponseDTO transformUser(UserRequestDTO userRequestDTO) {
        String id = UUID.randomUUID().toString();
        String hashedPassword = hasher.hashMethod(userRequestDTO.password(), userRequestDTO.iterations());
        int[] scores = userRequestDTO.scores();
        Arrays.sort(scores);
        boolean[] primes = primeCalculator.eratosthenes(userRequestDTO.limit());
        int highestPrime = primeCalculator.lastPrime(primes);

        return new UserResponseDTO(
                id,
                userRequestDTO.name(),
                hashedPassword,
                scores,
                highestPrime
        );
    }
}
