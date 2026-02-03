package de.niklas.apijava.lib;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.spec.KeySpec;
import java.util.Base64;

/**
 * Hasher kapselt die Logik zur Hash-Berechnung mittels PBKDF2
 */
@Component
public class Hasher {
    /** Verwendeter Hash-Algorithmus  */
    private static final String DIGEST = "PBKDF2WithHmacSHA256";
    /** Länge des abgeleiteten Schlüssels in Byte */
    private static final int KEY_LENGTH_BYTES = 64;
    /** Statisches Salt für die Hash-Berechnung */
    private static final byte[] SALT = "TOO_MUCH_SALT_IN_YOUR_FOOD_IS_BAD_FOR_YOU".getBytes(StandardCharsets.US_ASCII);

    /**
     * Erzeugt einen Hash aus dem gegebenen String
     * @param toBeHashed Eingabestring
     * @param iterations Anzahl an Iterationen
     * @return berechneter Hash als Base64-String
     * @throws RuntimeException wenn die Hash-Berechnung fehlschlägt
     */
    public String hashMethod(String toBeHashed, int iterations) {
        try{
            KeySpec spec = new PBEKeySpec(
                    toBeHashed.toCharArray(),
                    SALT,
                    iterations,
                    KEY_LENGTH_BYTES *8
            );
            SecretKeyFactory factory = SecretKeyFactory.getInstance(DIGEST);
            byte[] derivedKey = factory.generateSecret(spec).getEncoded();

            return Base64.getEncoder().encodeToString(derivedKey);
        }catch(Exception e){
            throw new RuntimeException("Error hashing data", e);
        }
    }
}
