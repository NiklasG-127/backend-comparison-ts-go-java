package dto

import "github.com/google/uuid"

type MixedRequest struct {
	Users []UsersInput `json:"users"`
}

type MixedResponse struct {
	UserOutput []UsersOutput `json:"userOutput"`
}

type UsersInput struct {
	Name       string `json:"name"`
	Password   string `json:"password"`
	Scores     []int  `json:"scores"`
	Limit      int    `json:"limit"`
	Iterations int    `json:"iterations"`
}
type UsersOutput struct {
	Id             uuid.UUID `json:"id"`
	Name           string    `json:"name"`
	HashedPassword string    `json:"hashedPassword"`
	Scores         []int     `json:"scores"`
	HighestPrime   int       `json:"highestPrime"`
}
