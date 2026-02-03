package config

import (
	"fmt"

	"github.com/ilyakaznacheev/cleanenv"
)

type (
	Config struct {
		App    `yaml:"app"`
		Server `yaml:"server"`
	}
	App struct {
		Name string `yaml:"name"`
	}
	Server struct {
		Port    string `yaml:"port" env:"SERVER_PORT" env-default:"8080"`
		Address string `yaml:"address" env:"SERVER_ADDRESS" env-default:"0.0.0.0"`
	}
)

// NewConfig lädt die Config.yaml und mögliche env Dateien. Env haben hier priorität
func NewConfig() (*Config, error) {
	cfg := &Config{}

	if err := cleanenv.ReadConfig("config.yaml", cfg); err != nil {
		return nil, fmt.Errorf("could not load config: %v", err)
	}
	if err := cleanenv.ReadEnv(cfg); err != nil {
		return nil, fmt.Errorf("could not read env: %v", err)
	}
	return cfg, nil
}
