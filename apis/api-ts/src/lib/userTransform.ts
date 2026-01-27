import {UserInputType, UserOutputType} from "../types/userType";
import {randomUUID} from "node:crypto";
import {hasher} from "./hasher";
import {sortingService} from "../service/computeService";
import {eratosthenes} from "./prime";

export function userTransform(userInput: UserInputType): UserOutputType{
    // Generiert eine UUID
    const id: string = randomUUID();
    // Hasht das Passwort mit dem hasher
    const hashedPassword: string = hasher(userInput.password, userInput.iterations);
    // Nutzt den SortingService, um die Scores zu sortieren
    const sorted: number[] = sortingService(userInput.scores);
    // Erstellt ein Array für Primzahlen mit dem Sieb des Eratosthenes
    const primes: boolean[] = eratosthenes(userInput.limit);
    // Holt die letzte Primzahl aus dem Array von Primzahlen
    const lastPrime: number = primes.lastIndexOf(true, userInput.limit);

    return {
        id: id,
        name: userInput.name,
        hashedPassword: hashedPassword,
        scores: sorted,
        highestPrime: lastPrime,
    }
}