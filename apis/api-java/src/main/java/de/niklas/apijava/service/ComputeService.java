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

/**
 * ComputeService kapselt die Berechnungslogik der Compute Endpunkte
 *
 * <p>Die benötigten Abhängigkeiten werden mittels Constructor Injection von Spring bereitgestellt</p>
 */
@Service
public class ComputeService {
    private final PrimeCalculator primeCalculator;
    private final Hasher hasher;
    private final UserTransform userTransform;

    /**
     * Erstellt einen ComputeService mit allen benötigten Abhängigkeiten
     * @param primeCalculator
     * @param hasher
     * @param userTransform
     */
    public ComputeService(PrimeCalculator primeCalculator, Hasher hasher, UserTransform userTransform) {
        this.primeCalculator = primeCalculator;
        this.hasher = hasher;
        this.userTransform = userTransform;
    }

    /**
     * Berechnet alle Primzahlen bis zum gegebenen Limit
     * @param limit Obergrenze zur Primzahl berechnung
     * @return {@link PrimeResponseDTO} mit Anzahl sowie größter Primzahl und Limit
     * @throws IllegalArgumentException wenn Limit negativ ist
     */
    public PrimeResponseDTO computePrimes(int limit) {
        if (limit < 0) throw new IllegalArgumentException("limit cannot be negative");
        boolean[] isPrime = primeCalculator.eratosthenes(limit);
        int lastPrime = primeCalculator.lastPrime(isPrime);
        int count = primeCalculator.countOfPrimes(isPrime);
        return new PrimeResponseDTO(limit, count, lastPrime);
    }

    /**
     * Sortiert ein gegebenes Array von Zahlen
     * @param values als Array von Ganzzahlen
     * @return {@link SortResponseDTO} mit den aufsteigend sortiertem Array von Zahlen
     */
    public SortResponseDTO computeSort(int[] values) {
        Arrays.sort(values);
        return new SortResponseDTO(values);
    }

    /**
     * Generiert einen Hash aus einem gegebenen String sowie einer Anzahl an durchläufen
     * @param toBeHashed Eingabestring
     * @param iterations Anzahl der durchläufe
     * @return {@link HashResponseDTO} mit dem generierten Hash
     * @throws ResponseStatusException wenn die Iterationen kleiner oder gleich 0 sind
     */
    public HashResponseDTO computeHash(String toBeHashed, int iterations){
        if (iterations <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Iterations must be greater than zero");
        }
        String hash = hasher.hashMethod(toBeHashed,  iterations);
        return new HashResponseDTO(hash);
    }

    /**
     * Verarbeitet ein Array von Benutzern und gibt diese transformiert zurück
     * @param requestDTO Eingabedaten der Benutzer
     * @return {@link MixedResponseDTO} mit den transformierten Benutzerdaten
     */
    public MixedResponseDTO computeMixed(UserRequestDTO[] requestDTO){
        UserResponseDTO[] users = new UserResponseDTO[requestDTO.length];
        for (int i = 0; i < requestDTO.length; i++) {
            UserRequestDTO u = requestDTO[i];
            users[i] = userTransform.transformUser(u);
        }
        return new MixedResponseDTO(users);
    }
}
