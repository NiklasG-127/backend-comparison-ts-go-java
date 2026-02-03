package service

import (
	"apis/api-go/internal/dto"
	"sort"
)

// OrderService kapselt die Logik für die Order-Endpunkte
type OrderService struct{}

// NewOrderService erstellt eine neue OrderService-Instanz
func NewOrderService() *OrderService {
	return &OrderService{}
}

// Aggregate aggregiert bezahlte Bestellungen pro Kunde
func (os *OrderService) Aggregate(orders []dto.OrderInput) ([]dto.CustomerOut, error) {
	m := make(map[string]dto.CustomerOut, len(orders))

	for _, order := range orders {
		if order.Status != "PAID" {
			continue
		}
		entry, ok := m[order.CustomerId]
		if !ok {
			entry = dto.CustomerOut{
				CustomerId:  order.CustomerId,
				TotalOrders: 0,
				Amount:      0,
				Avg:         0,
			}
			m[order.CustomerId] = entry
		}
		entry.TotalOrders++
		entry.Amount += order.Amount
		entry.Avg = entry.Amount / float64(entry.TotalOrders)

		m[order.CustomerId] = entry
	}

	result := make([]dto.CustomerOut, 0, len(m))
	for _, v := range m {
		result = append(result, v)
	}

	sort.Slice(result, func(i, j int) bool {
		return result[i].CustomerId < result[j].CustomerId
	})

	return result, nil
}
