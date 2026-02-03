package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// HealthHandler verarbeitet Health-Http-Endpunkt
type HealthHandler struct{}

// NewHealthHandler erstellt einen neuen HealthHandler
func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

// Health verarbeitet den Health-Endpunkt
func (h *HealthHandler) Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "Ok"})
}
