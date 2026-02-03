package de.niklas.apijava;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Startpunkt der Spring-Boot-Anwednung
 */
@SpringBootApplication
public class ApiJavaApplication {

    /**
     * Startet die Anwednung
     * @param args Kommandozeilenargumente
     */
    static void main(String[] args) {
        SpringApplication.run(ApiJavaApplication.class, args);
    }

}
