package server

import (
	"apis/api-go/internal/handler"

	"github.com/gin-gonic/gin"
)

// registerRoutes registriert alle Routen
func registerRoutes(router *gin.Engine, h *handler.HealthHandler, c *handler.ComputeHandler, o *handler.OrderHandler) {
	router.GET("/health", h.Health)

	compute := router.Group("/compute")
	{

		compute.POST("/hash", c.Hashing)
		compute.POST("/primes", c.Prime)
		compute.POST("/sort", c.Sort)
		compute.POST("/mixed", c.Mixed)

	}

	orders := router.Group("/orders")
	{
		orders.POST("/aggregate", o.Aggregate)
	}
}
