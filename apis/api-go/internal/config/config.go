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
		Port    string `yaml:"port"`
		Address string `yaml:"address"`
	}
)

func NewConfig() (*Config, error) {
	cfg := &Config{}

	err := cleanenv.ReadConfig("config.yaml", cfg)
	if err != nil {
		return nil, fmt.Errorf("could not load config: %v", err)
	}
	return cfg, nil
}
