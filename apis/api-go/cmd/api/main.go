package main

import (
	"apis/api-go/internal/config"
	"apis/api-go/internal/server"
	"fmt"
	"os"
)

// main Ausgangspunkt des Servers/Programms
func main() {
	// Lädt die Config
	cfg, err := config.NewConfig()
	if err != nil {
		fmt.Printf("could not create config: %v", err)
		os.Exit(1)
	}
	// Erstellt eine neue Instanz des Servers
	srv, err := server.NewServer(cfg)
	if err != nil {
		fmt.Printf("could not create server: %v", err)
		os.Exit(1)
	}
	// Startet den Server
	if err := srv.Start(); err != nil {
		fmt.Printf("could not start server: %v", err)
		os.Exit(1)
	}
}
