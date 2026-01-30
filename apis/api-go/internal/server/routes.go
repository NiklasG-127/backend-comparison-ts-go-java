package server

import (
	"apis/api-go/internal/handler"

	"github.com/gin-gonic/gin"
)

// registerRoutes registriert alle Routen
func registerRoutes(router *gin.Engine, h *handler.HealthHandler, c *handler.ComputeHandler, o *handler.OrderHandler) {
	router.GET("/health", h.Health)
	router.POST("/compute/hash", c.Hashing)
	router.POST("/compute/primes", c.Prime)
	router.POST("/compute/sort", c.Sort)
	router.POST("/compute/mixed", c.Mixed)
	router.POST("/orders/aggregate", o.Aggregate)
}
