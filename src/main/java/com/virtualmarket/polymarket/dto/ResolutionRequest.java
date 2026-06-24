package com.virtualmarket.polymarket.dto;

public class ResolutionRequest {

    private Long adminUserId;
    private Long marketId;
    private Long winningOutcomeId;

    public ResolutionRequest() {
    }

    public Long getAdminUserId() {
        return adminUserId;
    }

    public void setAdminUserId(Long adminUserId) {
        this.adminUserId = adminUserId;
    }

    public Long getMarketId() {
        return marketId;
    }

    public void setMarketId(Long marketId) {
        this.marketId = marketId;
    }

    public Long getWinningOutcomeId() {
        return winningOutcomeId;
    }

    public void setWinningOutcomeId(Long winningOutcomeId) {
        this.winningOutcomeId = winningOutcomeId;
    }
}
