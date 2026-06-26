package com.virtualmarket.polymarket.dto;

import java.math.BigDecimal;

public class MarketStatisticsResponse {

    private Long marketId;
    private long totalTrades;
    private BigDecimal totalVolume;
    private BigDecimal liquidity;
    private long activeTraders;

    public MarketStatisticsResponse() {
    }

    public MarketStatisticsResponse(
            Long marketId,
            long totalTrades,
            BigDecimal totalVolume,
            BigDecimal liquidity,
            long activeTraders
    ) {
        this.marketId = marketId;
        this.totalTrades = totalTrades;
        this.totalVolume = totalVolume;
        this.liquidity = liquidity;
        this.activeTraders = activeTraders;
    }

    public Long getMarketId() {
        return marketId;
    }

    public void setMarketId(Long marketId) {
        this.marketId = marketId;
    }

    public long getTotalTrades() {
        return totalTrades;
    }

    public void setTotalTrades(long totalTrades) {
        this.totalTrades = totalTrades;
    }

    public BigDecimal getTotalVolume() {
        return totalVolume;
    }

    public void setTotalVolume(BigDecimal totalVolume) {
        this.totalVolume = totalVolume;
    }

    public BigDecimal getLiquidity() {
        return liquidity;
    }

    public void setLiquidity(BigDecimal liquidity) {
        this.liquidity = liquidity;
    }

    public long getActiveTraders() {
        return activeTraders;
    }

    public void setActiveTraders(long activeTraders) {
        this.activeTraders = activeTraders;
    }
}
