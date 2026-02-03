package de.niklas.apijava.controller;

import de.niklas.apijava.dto.compute.hashing.HashRequestDTO;
import de.niklas.apijava.dto.compute.hashing.HashResponseDTO;
import de.niklas.apijava.dto.compute.mixed.MixedRequestDTO;
import de.niklas.apijava.dto.compute.mixed.MixedResponseDTO;
import de.niklas.apijava.dto.compute.primes.PrimeRequestDTO;
import de.niklas.apijava.dto.compute.primes.PrimeResponseDTO;
import de.niklas.apijava.dto.compute.sort.SortRequestDTO;
import de.niklas.apijava.dto.compute.sort.SortResponseDTO;
import de.niklas.apijava.service.ComputeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST-Controller für Compute-Endpunkte
 */
@RestController
@RequestMapping("/compute")
public class ComputeController {
    private final ComputeService computeService;

    /**
     * Erstellt einen ComputeController mit den benötigten Services
     * @param computeService Service für die Verarbeitung von Compute-Aufgaben
     */
    public ComputeController(ComputeService computeService) {
        this.computeService = computeService;
    }

    /**
     * Ermittelt die Anzahl der Primzahlen und die größte Primzahl bis zum angegebenen Limit
     * @param primeRequestDTO Gibt ein Limit bis wohin Primzahlen berechnet werden sollen
     * @return HTTP-Response mit Limit, Anzahl sowie größte Primzahl
     */
    @PostMapping("/primes")
    public ResponseEntity<PrimeResponseDTO> prime(@RequestBody PrimeRequestDTO primeRequestDTO) {
        PrimeResponseDTO responseDTO = computeService.computePrimes(primeRequestDTO.limit());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    /**
     * Sortiert ein Array von Zahlen
     * @param sortRequestDTO Ein Array von Zahlen (unsortiert)
     * @return HTTP-Response mit einem sortierten Array von Zahlen
     */
    @PostMapping("/sort")
    public ResponseEntity<SortResponseDTO> sort(@RequestBody SortRequestDTO sortRequestDTO) {
        SortResponseDTO responseDTO = computeService.computeSort(sortRequestDTO.values());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    /**
     * Hasht einen Eingabestring mit vorgegebenen Iterationen
     * @param hashRequestDTO Eingabestring sowie Anzahl der Durchläufe
     * @return HTTP-Response mit dem Hash
     */
    @PostMapping("/hash")
    public ResponseEntity<HashResponseDTO> hash(@RequestBody HashRequestDTO hashRequestDTO) {
        HashResponseDTO responseDTO = computeService.computeHash(hashRequestDTO.toBeHashed(), hashRequestDTO.iterations());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    /**
     * Transformiert jeden Benutzer im eingegebenen Array von Benutzern
     * @param mixRequestDTO Array von Benutzern
     * @return HTTP-Response mit einem Array von transformierten Benutzern
     */
    @PostMapping("/mixed")
    public ResponseEntity<MixedResponseDTO> mixed(@RequestBody MixedRequestDTO mixRequestDTO) {
        MixedResponseDTO responseDTO = computeService.computeMixed(mixRequestDTO.users());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
}
