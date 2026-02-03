package helper

import (
	"crypto/sha256"
	"encoding/base64"
	"errors"

	"golang.org/x/crypto/pbkdf2"
)

const (
	// keyLength definiert die Länge des abgeleiteten Schlüssels in Bytes
	keyLength = 64
)

// salt wird für die Schlüsselableitung verwendet
var salt = []byte("TOO_MUCH_SALT_IN_YOUR_FOOD_IS_BAD_FOR_YOU")

// Hasher erzeugt einen hash aus dem gegebenen String und der Anzahl an Iterationen
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
