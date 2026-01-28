import {pbkdf2Sync} from "node:crypto";

// Legt den Hash-Algorithmus fest
const DIGEST = 'sha256'
// Länge des abgeleiteten Schlüssels in Bytes
const KEY_LENGTH = 64;
// Fester Salt-Wert (für Tests konstant)
const SALT = Buffer.from("TOO_MUCH_SALT_IN_YOUR_FOOD_IS_BAD_FOR_YOU", "ascii");


export function hasher(toBeHashed: string, iterations: number): string{
    // Explizite UTF-8-Kodierung für eine vergleichbare Byte-Repräsentation
    const input = Buffer.from(toBeHashed, 'utf8');
    // Erzeugt einen abgeleiteten Schlüssel aus dem Eingabestring mit dem Salt, Wiederholungen, Länge des Ergebnisses und Algorithmus
    const derivedKey = pbkdf2Sync(
        input,
        SALT,
        iterations,
        KEY_LENGTH,
        DIGEST
    )
    // Rückgabe als Base64-kodierten String
    return derivedKey.toString('base64')
}