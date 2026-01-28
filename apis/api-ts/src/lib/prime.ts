// Sieb des Eratosthenes
export function eratosthenes(limit: number): boolean[]{
    // Erstellt ein Array aus Booleans mit Wert True mit Limit + 1 als Länge
    const isPrime: boolean[] = new Array(limit + 1).fill(true);
    // 0 und 1 sind keine Primzahlen also werden diese False gesetzt
    if(limit >= 0) isPrime[0] = false;
    if(limit >= 1) isPrime[1] = false;

    // Durchläuft alle Möglichen Primzahlen bis zur Wurzel des Limits
    for (let i = 2; i*i <= limit; i++){
        if (isPrime[i]){
            // Markiert alle vielfachen von i als nicht Primzahlen
            for (let j = i * i; j <= limit; j += i){
                isPrime[j] = false;
            }
        }
    }
    // Gibt das Array zurück
    return isPrime;
}

export function lastPrimeFunction(isPrime: boolean[]): number{
    // For Loop rückwärts über das Array und gibt die letzten Primzahl zurück
    for (let i = isPrime.length - 1; i >= 0; i--){
        if (isPrime[i])return i;
    }
    return -1;
}

export function countOfPrimes(primeArr: boolean[]): number{
    // Zähler
    let count = 0;
    // Loop der bei allen Primzahlen den Zähler erhöht
    for (let i = 0; i < primeArr.length; i++) {
        if (primeArr[i]) count++;
    }
    return count;
}