import {bodyHash, bodyMixed, bodyOrders, bodyPrimes, bodySort} from "./bodies";

export function pickEndpoint(){
    const r = Math.random();

    if(r < 0.2) return {path: "/health", method: "GET", body: null, endpoint: "health"}
    if(r < 0.5) return {path: "/compute/hash", method: "POST", body: bodyHash, endpoint: "compute_hash"}
    if(r < 0.7) return {path: "/compute/primes", method: "POST", body: bodyPrimes, endpoint: "compute_primes"}
    if(r < 0.85) return {path: "/compute/mixed", method: "POST", body: bodyMixed, endpoint: "compute_mixed"}
    if(r < 0.95) return {path: "/compute/sort", method: "POST", body: bodySort, endpoint: "compute_sort"}
    return {path: "/orders/aggregate", method: "POST", body: bodyOrders, endpoint: "orders_aggregate"}
}