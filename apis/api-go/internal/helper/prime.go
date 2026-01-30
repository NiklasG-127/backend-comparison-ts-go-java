package helper

func Eratosthenes(limit int) []bool {
	isPrime := make([]bool, limit+1)
	for i := 0; i <= limit; i++ {
		isPrime[i] = true
	}
	isPrime[0] = false
	isPrime[1] = false

	for i := 2; i*i <= limit; i++ {
		if isPrime[i] {
			for j := i * i; j <= limit; j += i {
				isPrime[j] = false
			}
		}
	}

	return isPrime
}

func LastPrime(isPrime []bool) int {
	for i := len(isPrime) - 1; i >= 0; i-- {
		if isPrime[i] {
			return i
		}
	}
	return -1
}

func CountOfPrimes(isPrime []bool) int {
	count := 0
	for i := 0; i < len(isPrime); i++ {
		if isPrime[i] {
			count++
		}
	}
	return count
}
