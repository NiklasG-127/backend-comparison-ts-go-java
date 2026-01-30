package helper

import (
	"crypto/sha256"
	"encoding/base64"
	"errors"

	"golang.org/x/crypto/pbkdf2"
)

const (
	keyLength = 64
)

var salt = []byte("TOO_MUCH_SALT_IN_YOUR_FOOD_IS_BAD_FOR_YOU")

func Hasher(toBeHashed string, iterations int) (string, error) {
	if iterations <= 0 {
		return "", errors.New("iterations must be greater than zero")
	}

	input := []byte(toBeHashed)

	derivedKey := pbkdf2.Key(
		input,
		salt,
		iterations,
		keyLength,
		sha256.New,
	)
	return base64.StdEncoding.EncodeToString(derivedKey), nil
}
