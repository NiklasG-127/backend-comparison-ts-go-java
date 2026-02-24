// Alle Endpunkte durcheinander aber gleiche Gewichtung
export const patternSmoke = [
    "health", "hash", "primes", "mixed", "sort", "orders",
    "health", "mixed", "hash", "orders", "primes", "sort",
    "health", "orders", "hash", "mixed", "sort", "primes"
];

/* Verteilung gewichtet realistischerer Alltagsbetrieb
health 2%
hash 20%
primes 15%
sort 8%
mixed 25%
orders 30%
*/
export const patternLoad = [
    "health", "hash", "orders", "mixed", "primes", "hash",
    "orders", "mixed", "hash", "sort", "orders", "mixed",
    "primes", "hash", "orders", "mixed", "hash", "orders",
    "mixed", "primes", "orders", "hash", "mixed", "orders",
    "sort", "hash", "orders", "mixed", "health", "orders",
    "mixed", "primes", "hash", "orders", "mixed", "hash",
    "orders", "mixed", "sort", "orders", "hash", "mixed",
    "primes", "orders", "hash", "mixed", "orders", "hash",
    "orders", "mixed"
];

/*
health 8%
hash 18%
primes 8%
sort 4%
mixed 20%
orders 42%
*/

export const patternSoak = [
    "health", "orders", "hash", "mixed", "orders", "primes",
    "orders", "mixed", "hash", "orders", "health", "mixed",
    "orders", "hash", "orders", "primes", "orders", "mixed",
    "sort", "orders", "hash", "orders", "mixed", "orders",
    "health", "orders", "hash", "mixed", "orders", "primes",
    "orders", "mixed", "hash", "orders", "sort", "orders",
    "hash", "mixed", "orders", "orders", "health", "orders",
    "mixed", "hash", "orders", "primes", "orders", "mixed",
    "orders", "hash"
];