package dto

type PrimeRequest struct {
	Limit int `json:"limit"`
}

type PrimeResponse struct {
	Limit     int `json:"limit"`
	Count     int `json:"count"`
	LastPrime int `json:"lastPrime"`
}
