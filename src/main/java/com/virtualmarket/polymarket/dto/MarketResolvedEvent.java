package com.virtualmarket.polymarket.dto;

import java.time.LocalDateTime;

public class MarketResolvedEvent {

    private Long marketId;
    private String winningOutcome;
    private LocalDateTime resolvedAt;

    public MarketResolvedEvent() {
    }

    public MarketResolvedEvent(Long marketId, String winningOutcome, LocalDateTime resolvedAt) {
        this.marketId = marketId;
        this.winningOutcome = winningOutcome;
        this.resolvedAt = resolvedAt;
    }

    public Long getMarketId() {
        return marketId;
    }

    public void setMarketId(Long marketId) {
        this.marketId = marketId;
    }

    public String getWinningOutcome() {
        return winningOutcome;
    }

    public void setWinningOutcome(String winningOutcome) {
        this.winningOutcome = winningOutcome;
    }

    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }
}
