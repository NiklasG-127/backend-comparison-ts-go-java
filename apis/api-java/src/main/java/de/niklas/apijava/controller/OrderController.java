package de.niklas.apijava.controller;

import de.niklas.apijava.dto.order.OrderAggregateRequestDTO;
import de.niklas.apijava.dto.order.OrderAggregateResponseDTO;
import de.niklas.apijava.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST-Controller für Order-Endpunkte
 */
@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    /**
     * Erstellt einen OrderController mit den benötigten Services
     * @param orderService Service für die Verarbeitung der Bestellungen
     */
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Aggregiert bezahlte Bestellungen pro Kunde
     * @param orders Eingabedaten mit Bestellungen
     * @return HTTP-Response mit aggregierten Kundendaten
     */
    @PostMapping("/aggregate")
    public ResponseEntity<OrderAggregateResponseDTO> aggregate(@RequestBody OrderAggregateRequestDTO orders){
        OrderAggregateResponseDTO response = orderService.aggregateOrders(orders.orders());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
