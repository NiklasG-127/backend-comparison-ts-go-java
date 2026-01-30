package server

import (
	"apis/api-go/internal/config"
	"apis/api-go/internal/handler"
	"apis/api-go/internal/service"
	"fmt"

	"github.com/gin-gonic/gin"
)

// Server eine Instanz von Server die Config und router hält
type Server struct {
	config *config.Config
	router *gin.Engine
}

// NewServer gibt eine neue Serverinstanz zurück
func NewServer(config *config.Config) (*Server, error) {
	router := gin.New()

	server := &Server{
		config: config,
		router: router,
	}
	healthHandler := handler.NewHealthHandler()
	computeHandler := handler.NewComputeHandler(service.NewComputeService())
	orderHandler := handler.NewOrderHandler(service.NewOrderService())
	registerRoutes(router, healthHandler, computeHandler, orderHandler)

	return server, nil
}

// Start startet den Server
func (server *Server) Start() error {
	addr := server.config.Address + ":" + server.config.Port
	if err := server.router.Run(addr); err != nil {
		return fmt.Errorf("could not start the Server: %v", err)
	}
	return nil
}
