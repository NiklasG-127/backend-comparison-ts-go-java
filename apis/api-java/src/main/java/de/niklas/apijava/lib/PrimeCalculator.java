package de.niklas.apijava.lib;

import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * PrimeCalculator kapselt die Logik um Primzahlen zu berechnen
 */
@Component
public class PrimeCalculator {

    /**
     * Berechnet Primzahlen mit dem Sieb des Eratosthenes
     * @param limit Obergrenze der Primzahlen
     * @return isPrime als Array von Booleans wo alle Primzahlen True sind
     */
    public boolean[] eratosthenes(int limit) {
        boolean[] isPrime = new boolean[limit + 1];
        Arrays.fill(isPrime, true);
        if(limit >= 0) isPrime[0] = false;
        if(limit >= 1) isPrime[1] = false;

        for (int i = 2; i * i <= limit; i++) {
            if(isPrime[i]){
                for(int j = i * i; j <= limit; j += i){
                    isPrime[j] = false;
                }
            }
        }
        return isPrime;
    }

    /**
     * Gibt die Letzte/Größte Primzahl im Array aus
     * @param isPrime Array von Booleans welches die Primzahlen hat
     * @return Die größte/letzte Primzahl im Array
     */
    public int lastPrime(boolean[] isPrime) {
        for(int i = isPrime.length - 1; i >= 0; i--){
            if(isPrime[i]){
                return i;
            }
        }
        return -1;
    }

    /**
     * Gibt die Anzahl der Primzahlen aus dem Array zurück
     * @param isPrime Array von Booleans welches die Primzahlen hat
     * @return Anzahl an Primzahlen im Array
     */
    public int countOfPrimes(boolean[] isPrime) {
        int count = 0;
        for (boolean value : isPrime) {
            if (value) {
                count++;
            }
        }
        return count;
    }
}
