package de.niklas.apijava.controller;

import de.niklas.apijava.dto.health.StatusResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<StatusResponseDTO> health(){
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO("ok"));
    }
}
