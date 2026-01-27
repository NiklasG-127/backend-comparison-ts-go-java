package de.niklas.apijava.lib;

import de.niklas.apijava.dto.compute.mixed.UserRequestDTO;
import de.niklas.apijava.dto.compute.mixed.UserResponseDTO;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.UUID;

@Component
public class UserTransform {
    private final Hasher hasher;
    private final PrimeCalculator primeCalculator;

    public UserTransform(Hasher hasher, PrimeCalculator primeCalculator) {
        this.hasher = hasher;
        this.primeCalculator = primeCalculator;
    }

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
