package handler

import (
	"apis/api-go/internal/dto"
	"apis/api-go/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type OrderHandler struct {
	orderService *service.OrderService
}

func NewOrderHandler(orderService *service.OrderService) *OrderHandler {
	return &OrderHandler{orderService}
}

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
