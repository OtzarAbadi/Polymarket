package com.virtualmarket.polymarket.dto;

import com.virtualmarket.polymarket.enums.TradeType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TradeCreatedEvent {

    private Long tradeId;
    private Long marketId;
    private Long userId;
    private String outcome;
    private TradeType type;
    private BigDecimal quantity;
    private BigDecimal price;
    private BigDecimal totalCost;
    private LocalDateTime createdAt;

    public TradeCreatedEvent() {
    }

    public TradeCreatedEvent(
            Long tradeId,
            Long marketId,
            Long userId,
            String outcome,
            TradeType type,
            BigDecimal quantity,
            BigDecimal price,
            BigDecimal totalCost,
            LocalDateTime createdAt
    ) {
        this.tradeId = tradeId;
        this.marketId = marketId;
        this.userId = userId;
        this.outcome = outcome;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.totalCost = totalCost;
        this.createdAt = createdAt;
    }

    public Long getTradeId() {
        return tradeId;
    }

    public void setTradeId(Long tradeId) {
        this.tradeId = tradeId;
    }

    public Long getMarketId() {
        return marketId;
    }

    public void setMarketId(Long marketId) {
        this.marketId = marketId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getOutcome() {
        return outcome;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }

    public TradeType getType() {
        return type;
    }

    public void setType(TradeType type) {
        this.type = type;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
