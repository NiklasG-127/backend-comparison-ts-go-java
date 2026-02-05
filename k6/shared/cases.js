import {bodyHash, bodyMixed, bodyOrders, bodyPrimes, bodySort} from "./bodies.js";

export const cases = {
    health: {path: "/health", method: "GET", body: null, endpoint: "health"},
    hash: {path: "/compute/hash", method: "POST", body: bodyHash, endpoint: "compute_hash"},
    primes: {path: "/compute/primes", method: "POST", body: bodyPrimes, endpoint: "compute_primes"},
    mixed: {path: "/compute/mixed", method: "POST", body: bodyMixed, endpoint: "compute_mixed"},
    sort: {path: "/compute/sort", method: "POST", body: bodySort, endpoint: "compute_sort"},
    orders: {path: "/orders/aggregate", method: "POST", body: bodyOrders, endpoint: "orders_aggregate"}
}