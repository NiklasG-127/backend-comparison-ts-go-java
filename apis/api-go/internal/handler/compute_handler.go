package handler

import (
	"apis/api-go/internal/dto"
	"apis/api-go/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ComputeHandler verarbeitet Compute Http-Endpunkte
type ComputeHandler struct {
	computeService *service.ComputeService
}

// NewComputeHandler erstellt einen neuen ComputeHandler mit dem service.ComputeService
func NewComputeHandler(computeService *service.ComputeService) *ComputeHandler {
	return &ComputeHandler{computeService}
}

// Hashing verarbeitet den Hash-Endpunkt
func (ch *ComputeHandler) Hashing(ctx *gin.Context) {
	var req dto.HashRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hash, err := ch.computeService.Hashing(req.ToBeHashed, req.Iterations)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, dto.HashResponse{Hash: hash})
}

// Prime verarbeitet den Primzahl-Endpunkt
func (ch *ComputeHandler) Prime(ctx *gin.Context) {
	var req dto.PrimeRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	count, lastPrime, err := ch.computeService.Prime(req.Limit)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, dto.PrimeResponse{Limit: req.Limit, Count: count, LastPrime: lastPrime})
}

// Sort verarbeitet den Sortier-Endpunkt
func (ch *ComputeHandler) Sort(ctx *gin.Context) {
	var req dto.SortRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	sorted, err := ch.computeService.Sort(req.Values)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	ctx.JSON(http.StatusOK, dto.SortResponse{Sorted: sorted})
}

// Mixed verarbeitet den Mixed Endpunkt
func (ch *ComputeHandler) Mixed(ctx *gin.Context) {
	var req dto.MixedRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	userOutput, err := ch.computeService.Mixed(req.Users)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, dto.MixedResponse{UserOutput: userOutput})
}
