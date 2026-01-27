// Sieb des Eratosthenes
export function eratosthenes(limit: number): boolean[]{
    // Erstellt ein Array aus Booleans mit Wert True mit Limit + 1 als Länge
    const isPrime: boolean[] = new Array(limit + 1).fill(true);
    // 0 und 1 sind keine Primzahlen also werden diese False gesetzt
    isPrime[0] = false;
    isPrime[1] = false;

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

export function primeArrReducer(primeArr: boolean[]): number{
    // Reduziert das Array auf nur positive Werte
    const arr: boolean[] = primeArr.filter(prime => prime);
    // Gibt die Anzahl der positiven Werte zurück
    return arr.length;
}