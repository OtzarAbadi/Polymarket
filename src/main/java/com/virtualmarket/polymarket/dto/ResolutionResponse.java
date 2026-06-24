package com.virtualmarket.polymarket.dto;

import java.math.BigDecimal;

public class ResolutionResponse {

    private Long marketId;
    private String marketTitle;
    private Long winningOutcomeId;
    private String winningOutcomeName;
    private Integer totalUsersPaid;
    private BigDecimal totalPayoutAmount;

    public ResolutionResponse() {
    }

    public Long getMarketId() {
        return marketId;
    }

    public void setMarketId(Long marketId) {
        this.marketId = marketId;
    }

    public String getMarketTitle() {
        return marketTitle;
    }

    public void setMarketTitle(String marketTitle) {
        this.marketTitle = marketTitle;
    }

    public Long getWinningOutcomeId() {
        return winningOutcomeId;
    }

    public void setWinningOutcomeId(Long winningOutcomeId) {
        this.winningOutcomeId = winningOutcomeId;
    }

    public String getWinningOutcomeName() {
        return winningOutcomeName;
    }

    public void setWinningOutcomeName(String winningOutcomeName) {
        this.winningOutcomeName = winningOutcomeName;
    }

    public Integer getTotalUsersPaid() {
        return totalUsersPaid;
    }

    public void setTotalUsersPaid(Integer totalUsersPaid) {
        this.totalUsersPaid = totalUsersPaid;
    }

    public BigDecimal getTotalPayoutAmount() {
        return totalPayoutAmount;
    }

    public void setTotalPayoutAmount(BigDecimal totalPayoutAmount) {
        this.totalPayoutAmount = totalPayoutAmount;
    }
}
