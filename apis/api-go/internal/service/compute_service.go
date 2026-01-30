package service

import (
	"apis/api-go/internal/dto"
	"apis/api-go/internal/helper"
	"errors"
	"sort"
)

type ComputeService struct{}

func NewComputeService() *ComputeService {
	return &ComputeService{}
}

func (cs *ComputeService) Hashing(toBeHashed string, iterations int) (string, error) {
	return helper.Hasher(toBeHashed, iterations)
}

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

func (cs *ComputeService) Sort(values []int) ([]int, error) {
	sort.Ints(values)
	return values, nil
}

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
