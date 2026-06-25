package com.virtualmarket.polymarket.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PriceHistoryResponse {

    private LocalDateTime timestamp;
    private BigDecimal yesPrice;
    private BigDecimal noPrice;

    public PriceHistoryResponse() {
    }

    public PriceHistoryResponse(LocalDateTime timestamp, BigDecimal yesPrice, BigDecimal noPrice) {
        this.timestamp = timestamp;
        this.yesPrice = yesPrice;
        this.noPrice = noPrice;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
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
}
