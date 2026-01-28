import {eratosthenes, countOfPrimes, lastPrimeFunction} from "../lib/prime";
import {hasher} from "../lib/hasher";
import {UserInputType, UserOutputType} from "../types/userType";
import {userTransform} from "../lib/userTransform";

export function hashingService(toBeHashed: string, iterations: number): string {
    // Ruft den Hasher auf, der das Hashing durchführt und gibt das Ergebnis zurück
    return hasher(toBeHashed, iterations);
}

export function sortingService(numArr: number[]): number[] {
    // Sortiert das Array aufsteigend und gibt es direkt zurück an den Controller
    return numArr.sort((a, b) => a - b);
}

export function primeService(limit: number): {count: number; lastPrime: number} {
    if(limit < 0) throw new Error("Limit cant be negative");
    // Erstellt ein Array mit Booleans mit einer Helper Funktion
    const primeArr: boolean[] = eratosthenes(limit);
    // Holt die Anzahl der primes im primeArr
    const count: number = countOfPrimes(primeArr);
    // Holt den letzten Index eines True Wertes (also einer Primzahl im primeArr
    const lastPrime: number = lastPrimeFunction(primeArr);

    return {count, lastPrime};
}

export function mixedService(users: UserInputType[]): UserOutputType[]{
    // Iteriert über jeden User im users Array und übergibt ihn an die userTransform Funktion
    return users.map((user) => userTransform(user));
}