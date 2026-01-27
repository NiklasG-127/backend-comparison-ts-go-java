package de.niklas.apijava.lib;

import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class PrimeCalculator {

    public boolean[] eratosthenes(int limit) {
        boolean[] isPrime = new boolean[limit + 1];
        Arrays.fill(isPrime, true);
        if(limit >= 0){
            isPrime[0] = false;
        }
        if(limit >= 1){
            isPrime[1] = false;
        }
        for (int i = 2; i < limit; i++) {
            if(isPrime[i]){
                for(int j = i * i; j < limit; j += i){
                    isPrime[j] = false;
                }
            }
        }
        return isPrime;
    }

    public int lastPrime(boolean[] isPrime) {
        for(int i = isPrime.length - 1; i >= 0; i--){
            if(isPrime[i]){
                return i;
            }
        }
        return -1;
    }

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
