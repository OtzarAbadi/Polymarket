package com.virtualmarket.polymarket.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class UserPortfolioUpdatedEvent {

    private Long userId;
    private BigDecimal walletBalance;
    private LocalDateTime updatedAt;

    public UserPortfolioUpdatedEvent() {
    }

    public UserPortfolioUpdatedEvent(Long userId, BigDecimal walletBalance, LocalDateTime updatedAt) {
        this.userId = userId;
        this.walletBalance = walletBalance;
        this.updatedAt = updatedAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BigDecimal getWalletBalance() {
        return walletBalance;
    }

    public void setWalletBalance(BigDecimal walletBalance) {
        this.walletBalance = walletBalance;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
