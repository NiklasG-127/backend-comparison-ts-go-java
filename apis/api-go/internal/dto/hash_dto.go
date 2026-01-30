package dto

type HashRequest struct {
	ToBeHashed string `json:"toBeHashed"`
	Iterations int    `json:"iterations"`
}

type HashResponse struct {
	Hash string `json:"hash"`
}
