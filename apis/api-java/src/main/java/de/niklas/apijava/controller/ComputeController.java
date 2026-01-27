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

@RestController
@RequestMapping("/compute")
public class ComputeController {
    private final ComputeService computeService;

    public ComputeController(ComputeService computeService) {
        this.computeService = computeService;
    }

    @PostMapping("/primes")
    public ResponseEntity<PrimeResponseDTO> sort(@RequestBody PrimeRequestDTO primeRequestDTO) {
        PrimeResponseDTO responseDTO = computeService.computePrimes(primeRequestDTO.limit());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @PostMapping("/sort")
    public ResponseEntity<SortResponseDTO> sort(@RequestBody SortRequestDTO sortRequestDTO) {
        SortResponseDTO responseDTO = computeService.computeSort(sortRequestDTO.values());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @PostMapping("/hash")
    public ResponseEntity<HashResponseDTO> hash(@RequestBody HashRequestDTO hashRequestDTO) {
        HashResponseDTO responseDTO = computeService.computeHash(hashRequestDTO.toBeHashed(), hashRequestDTO.iterations());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @PostMapping("/mixed")
    public ResponseEntity<MixedResponseDTO> mixed(@RequestBody MixedRequestDTO mixRequestDTO) {
        MixedResponseDTO responseDTO = computeService.computeMixed(mixRequestDTO.users());
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
}
