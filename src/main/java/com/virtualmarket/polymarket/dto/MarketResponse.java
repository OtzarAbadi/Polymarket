package com.virtualmarket.polymarket.dto;

import com.virtualmarket.polymarket.enums.MarketStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MarketResponse {

    private Long marketId;
    private String title;
    private String description;
    private String category;
    private MarketStatus status;
    private LocalDateTime tradingCloseDate;
    private LocalDateTime resolutionDate;
    private String resolutionSource;
    private Long yesOutcomeId;
    private Long noOutcomeId;
    private BigDecimal yesPrice;
    private BigDecimal noPrice;

    public MarketResponse() {
    }

    public MarketResponse(
            Long marketId,
            String title,
            String description,
            String category,
            MarketStatus status,
            LocalDateTime tradingCloseDate,
            LocalDateTime resolutionDate,
            String resolutionSource,
            Long yesOutcomeId,
            Long noOutcomeId,
            BigDecimal yesPrice,
            BigDecimal noPrice
    ) {
        this.marketId = marketId;
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status;
        this.tradingCloseDate = tradingCloseDate;
        this.resolutionDate = resolutionDate;
        this.resolutionSource = resolutionSource;
        this.yesOutcomeId = yesOutcomeId;
        this.noOutcomeId = noOutcomeId;
        this.yesPrice = yesPrice;
        this.noPrice = noPrice;
    }

    public Long getMarketId() {
        return marketId;
    }

    public void setMarketId(Long marketId) {
        this.marketId = marketId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public MarketStatus getStatus() {
        return status;
    }

    public void setStatus(MarketStatus status) {
        this.status = status;
    }

    public LocalDateTime getTradingCloseDate() {
        return tradingCloseDate;
    }

    public void setTradingCloseDate(LocalDateTime tradingCloseDate) {
        this.tradingCloseDate = tradingCloseDate;
    }

    public LocalDateTime getResolutionDate() {
        return resolutionDate;
    }

    public void setResolutionDate(LocalDateTime resolutionDate) {
        this.resolutionDate = resolutionDate;
    }

    public String getResolutionSource() {
        return resolutionSource;
    }

    public void setResolutionSource(String resolutionSource) {
        this.resolutionSource = resolutionSource;
    }

    public Long getYesOutcomeId() {
        return yesOutcomeId;
    }

    public void setYesOutcomeId(Long yesOutcomeId) {
        this.yesOutcomeId = yesOutcomeId;
    }

    public Long getNoOutcomeId() {
        return noOutcomeId;
    }

    public void setNoOutcomeId(Long noOutcomeId) {
        this.noOutcomeId = noOutcomeId;
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
