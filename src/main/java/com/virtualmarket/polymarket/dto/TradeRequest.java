package com.virtualmarket.polymarket.dto;

import com.virtualmarket.polymarket.enums.TradeType;

import java.math.BigDecimal;

public class TradeRequest {

    private Long userId;
    private Long marketId;
    private Long outcomeId;
    private BigDecimal quantity;
    private TradeType type;

    public TradeRequest() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMarketId() {
        return marketId;
    }

    public void setMarketId(Long marketId) {
        this.marketId = marketId;
    }

    public Long getOutcomeId() {
        return outcomeId;
    }

    public void setOutcomeId(Long outcomeId) {
        this.outcomeId = outcomeId;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public TradeType getType() {
        return type;
    }

    public void setType(TradeType type) {
        this.type = type;
    }
}
