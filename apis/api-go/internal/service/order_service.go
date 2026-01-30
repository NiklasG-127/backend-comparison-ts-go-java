package service

import (
	"apis/api-go/internal/dto"
	"sort"
)

type OrderService struct{}

func NewOrderService() *OrderService {
	return &OrderService{}
}

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

	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}

	sort.Strings(keys)

	result := make([]dto.CustomerOut, 0, len(m))
	for _, k := range keys {
		result = append(result, m[k])
	}
	return result, nil
}
