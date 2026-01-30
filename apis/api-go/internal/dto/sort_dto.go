package dto

type SortRequest struct {
	Values []int `json:"values"`
}

type SortResponse struct {
	Sorted []int `json:"sorted"`
}
