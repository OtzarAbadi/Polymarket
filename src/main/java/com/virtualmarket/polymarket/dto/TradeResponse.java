package com.virtualmarket.polymarket.dto;

import com.virtualmarket.polymarket.enums.TradeType;

import java.math.BigDecimal;

public class TradeResponse {

    private Long tradeId;
    private Long userId;
    private Long marketId;
    private Long outcomeId;
    private TradeType type;
    private BigDecimal quantity;
    private BigDecimal price;
    private BigDecimal totalCost;
    private BigDecimal walletBalanceAfterTrade;
    private BigDecimal positionQuantityAfterTrade;

    public TradeResponse() {
    }

    public Long getTradeId() {
        return tradeId;
    }

    public void setTradeId(Long tradeId) {
        this.tradeId = tradeId;
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

    public BigDecimal getWalletBalanceAfterTrade() {
        return walletBalanceAfterTrade;
    }

    public void setWalletBalanceAfterTrade(BigDecimal walletBalanceAfterTrade) {
        this.walletBalanceAfterTrade = walletBalanceAfterTrade;
    }

    public BigDecimal getPositionQuantityAfterTrade() {
        return positionQuantityAfterTrade;
    }

    public void setPositionQuantityAfterTrade(BigDecimal positionQuantityAfterTrade) {
        this.positionQuantityAfterTrade = positionQuantityAfterTrade;
    }
}
