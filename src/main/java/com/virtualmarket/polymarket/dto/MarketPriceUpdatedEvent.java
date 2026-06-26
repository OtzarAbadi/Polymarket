package com.virtualmarket.polymarket.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MarketPriceUpdatedEvent {

    private Long marketId;
    private BigDecimal yesPrice;
    private BigDecimal noPrice;
    private LocalDateTime updatedAt;

    public MarketPriceUpdatedEvent() {
    }

    public MarketPriceUpdatedEvent(Long marketId, BigDecimal yesPrice, BigDecimal noPrice, LocalDateTime updatedAt) {
        this.marketId = marketId;
        this.yesPrice = yesPrice;
        this.noPrice = noPrice;
        this.updatedAt = updatedAt;
    }

    public Long getMarketId() {
        return marketId;
    }

    public void setMarketId(Long marketId) {
        this.marketId = marketId;
    }

    public BigDecimal getYesPrice() {
        return yesPrice;
    }

    public void setYesPrice(BigDecimal yesPrice) {
        this.yesPrice = yesPrice;
    }

    public BigDecimal getNoPrice() {
        return noPrice;
    }

    public void setNoPrice(BigDecimal noPrice) {
        this.noPrice = noPrice;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
