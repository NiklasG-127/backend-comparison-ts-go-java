package service

import (
	"apis/api-go/internal/dto"
	"apis/api-go/internal/helper"
	"errors"
	"sort"
)

// ComputeService kapselt die Berechnungslogik für Compute-Endpunkte
type ComputeService struct{}

// NewComputeService erstellt eine neue ComputeService-Instanz
func NewComputeService() *ComputeService {
	return &ComputeService{}
}

// Hashing erzeugt einen Hash für den gegebene String
func (cs *ComputeService) Hashing(toBeHashed string, iterations int) (string, error) {
	return helper.Hasher(toBeHashed, iterations)
}

// Prime berechnet die Anzahl und die größte Primzahl bis zum gegebene Limit
func (cs *ComputeService) Prime(limit int) (int, int, error) {
	if limit < 0 {
		err := errors.New("limit cannot be less than 0")
		return 0, 0, err
	}
	isPrime := helper.Eratosthenes(limit)

	lastPrime := helper.LastPrime(isPrime)
	count := helper.CountOfPrimes(isPrime)

	return count, lastPrime, nil
}

// Sort sortiert eine Liste von Zahlen aufsteigend
func (cs *ComputeService) Sort(values []int) ([]int, error) {
	sort.Ints(values)
	return values, nil
}

// Mixed verarbeitet mehrere Nutzer und gibt transformierte Ergebnisse zurück
func (cs *ComputeService) Mixed(users []dto.UsersInput) ([]dto.UsersOutput, error) {
	userOutputs := make([]dto.UsersOutput, len(users))
	for i := 0; i < len(users); i++ {
		out, err := helper.UserTransform(users[i])
		if err != nil {
			return nil, err
		}
		userOutputs[i] = out
	}
	return userOutputs, nil
}
