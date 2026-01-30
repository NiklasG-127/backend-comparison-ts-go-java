package helper

import (
	"apis/api-go/internal/dto"
	"sort"

	"github.com/google/uuid"
)

func UserTransform(user dto.UsersInput) (dto.UsersOutput, error) {
	id := uuid.New()
	hashedPassword, err := Hasher(user.Password, user.Iterations)
	if err != nil {
		return dto.UsersOutput{}, err
	}
	sort.Ints(user.Scores)
	isPrime := Eratosthenes(user.Limit)
	lastPrime := LastPrime(isPrime)

	return dto.UsersOutput{
		Id:             id,
		Name:           user.Name,
		HashedPassword: hashedPassword,
		Scores:         user.Scores,
		HighestPrime:   lastPrime,
	}, nil
}
