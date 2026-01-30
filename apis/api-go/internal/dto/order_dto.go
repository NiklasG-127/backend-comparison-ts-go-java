package dto

type OrdersInput struct {
	Orders []OrderInput `json:"orders"`
}
type CustomersOutput struct {
	Customers []CustomerOut `json:"customers"`
}

type OrderInput struct {
	Id         string  `json:"id"`
	CustomerId string  `json:"customerId"`
	Amount     float64 `json:"amount"`
	Status     string  `json:"status"`
}
type CustomerOut struct {
	CustomerId  string  `json:"customerId"`
	TotalOrders int     `json:"totalOrders"`
	Amount      float64 `json:"amount"`
	Avg         float64 `json:"avg"`
}
