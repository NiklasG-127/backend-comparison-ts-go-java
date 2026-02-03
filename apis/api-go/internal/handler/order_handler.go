package handler

import (
	"apis/api-go/internal/dto"
	"apis/api-go/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

// OrderHandler verarbeitet Order Http-Endpunkt
type OrderHandler struct {
	orderService *service.OrderService
}

// NewOrderHandler erstellt einen neuen OrderHandler mit dem service.OrderService
func NewOrderHandler(orderService *service.OrderService) *OrderHandler {
	return &OrderHandler{orderService}
}

// Aggregate verarbeitet den aggregate-Endpunkt
func (oh *OrderHandler) Aggregate(ctx *gin.Context) {
	var req dto.OrdersInput
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	customers, err := oh.orderService.Aggregate(req.Orders)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, dto.CustomersOutput{Customers: customers})
}
