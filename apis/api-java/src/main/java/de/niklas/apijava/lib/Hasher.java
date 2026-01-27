package de.niklas.apijava.lib;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.spec.KeySpec;
import java.util.Base64;

@Component
public class Hasher {
    private static final String DIGEST = "PBKDF2WithHmacSHA256";
    private static final int KEY_LENGTH_BYTES = 64;
    private static final byte[] SALT = "TOO_MUCH_SALT_IN_YOUR_FOOD_IS_BAD_FOR_YOU".getBytes(StandardCharsets.US_ASCII);

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
