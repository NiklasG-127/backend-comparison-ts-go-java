package de.niklas.apijava.service;

import de.niklas.apijava.dto.compute.hashing.HashResponseDTO;
import de.niklas.apijava.dto.compute.mixed.MixedResponseDTO;
import de.niklas.apijava.dto.compute.mixed.UserRequestDTO;
import de.niklas.apijava.dto.compute.mixed.UserResponseDTO;
import de.niklas.apijava.dto.compute.primes.PrimeResponseDTO;
import de.niklas.apijava.dto.compute.sort.SortResponseDTO;
import de.niklas.apijava.lib.Hasher;
import de.niklas.apijava.lib.PrimeCalculator;
import de.niklas.apijava.lib.UserTransform;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;

@Service
public class ComputeService {
    private final PrimeCalculator primeCalculator;
    private final Hasher hasher;
    private final UserTransform userTransform;

    public ComputeService(PrimeCalculator primeCalculator, Hasher hasher, UserTransform userTransform) {
        this.primeCalculator = primeCalculator;
        this.hasher = hasher;
        this.userTransform = userTransform;
    }

    public PrimeResponseDTO computePrimes(int limit) {
        boolean[] isPrime = primeCalculator.eratosthenes(limit);
        int lastPrime = primeCalculator.lastPrime(isPrime);
        int count = primeCalculator.countOfPrimes(isPrime);
        return new PrimeResponseDTO(limit, lastPrime, count);
    }

    public SortResponseDTO computeSort(int[] values) {
        Arrays.sort(values);
        return new SortResponseDTO(values);
    }

    public HashResponseDTO computeHash(String toBeHashed, int iterations){
        if (iterations <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Iterations must be greater than zero");
        }
        String hash = hasher.hashMethod(toBeHashed,  iterations);
        return new HashResponseDTO(hash);
    }

    public MixedResponseDTO computeMixed(UserRequestDTO[] requestDTO){
        UserResponseDTO[] users = new UserResponseDTO[requestDTO.length];
        for (int i = 0; i < requestDTO.length; i++) {
            UserRequestDTO u = requestDTO[i];
            users[i] = userTransform.transformUser(u);
        }
        return new MixedResponseDTO(users);
    }
}
