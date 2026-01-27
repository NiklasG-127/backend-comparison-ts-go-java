package de.niklas.apijava.service;

import de.niklas.apijava.dto.order.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    public OrderAggregateResponseDTO aggregateOrders(OrderRequestDTO[] orders) {
        List<OrderRequestDTO> paidOrders = new ArrayList<>();
        for (OrderRequestDTO order : orders) {
            if (order.status() == STATUSENUM.PAID){
                paidOrders.add(order);
            }
        }
        List<OrderResponseDTO> aggregated = new ArrayList<>();

        for (OrderRequestDTO order : paidOrders) {
            OrderResponseDTO existing = null;
            for (OrderResponseDTO a : aggregated){
                if (a.customerId().equals(order.customerId())){
                    existing = a;
                    break;
                }
            }
            if (existing == null){
                existing = new OrderResponseDTO(
                        order.customerId(),
                        0,
                        0,
                        0

                );
                aggregated.add(existing);
            }
            int newTotal = existing.totalOrders() + 1;
            double newAmount = existing.amount() + order.amount();
            double newAvg = newAmount / newTotal;

            OrderResponseDTO updated = new OrderResponseDTO(
                    existing.customerId(),
                    newTotal,
                    newAmount,
                    newAvg
            );
            int index = aggregated.indexOf(existing);
            aggregated.set(index, updated);
        }
        OrderResponseDTO[] customersArray = aggregated.toArray(new OrderResponseDTO[0]);
        return new OrderAggregateResponseDTO(customersArray);
    }
}
