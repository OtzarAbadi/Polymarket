package com.virtualmarket.polymarket.dto;

import java.math.BigDecimal;

public class DashboardSummaryResponse {

    private long openMarkets;
    private long totalMarkets;
    private BigDecimal averagePrice;
    private BigDecimal walletBalance;
    private BigDecimal portfolioValue;
    private long totalTrades;
    private long openPositions;

    public DashboardSummaryResponse() {
    }

    public DashboardSummaryResponse(
            long openMarkets,
            long totalMarkets,
            BigDecimal averagePrice,
            BigDecimal walletBalance,
            BigDecimal portfolioValue,
            long totalTrades,
            long openPositions
    ) {
        this.openMarkets = openMarkets;
        this.totalMarkets = totalMarkets;
        this.averagePrice = averagePrice;
        this.walletBalance = walletBalance;
        this.portfolioValue = portfolioValue;
        this.totalTrades = totalTrades;
        this.openPositions = openPositions;
    }

    public long getOpenMarkets() {
        return openMarkets;
    }

    public void setOpenMarkets(long openMarkets) {
        this.openMarkets = openMarkets;
    }

    public long getTotalMarkets() {
        return totalMarkets;
    }

    public void setTotalMarkets(long totalMarkets) {
        this.totalMarkets = totalMarkets;
    }

    public BigDecimal getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(BigDecimal averagePrice) {
        this.averagePrice = averagePrice;
    }

    public BigDecimal getWalletBalance() {
        return walletBalance;
    }

    public void setWalletBalance(BigDecimal walletBalance) {
        this.walletBalance = walletBalance;
    }

    public BigDecimal getPortfolioValue() {
        return portfolioValue;
    }

    public void setPortfolioValue(BigDecimal portfolioValue) {
        this.portfolioValue = portfolioValue;
    }

    public long getTotalTrades() {
        return totalTrades;
    }

    public void setTotalTrades(long totalTrades) {
        this.totalTrades = totalTrades;
    }

    public long getOpenPositions() {
        return openPositions;
    }

    public void setOpenPositions(long openPositions) {
        this.openPositions = openPositions;
    }
}
