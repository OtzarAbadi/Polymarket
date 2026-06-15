package com.virtualmarket.polymarket.dto;

import com.virtualmarket.polymarket.enums.UserRole;

import java.math.BigDecimal;

public class AuthResponse {

    private Long userId;
    private String username;
    private String email;
    private UserRole role;
    private BigDecimal walletBalance;

    public AuthResponse() {
    }

    public AuthResponse(Long userId, String username, String email, UserRole role, BigDecimal walletBalance) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.walletBalance = walletBalance;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public BigDecimal getWalletBalance() {
        return walletBalance;
    }

    public void setWalletBalance(BigDecimal walletBalance) {
        this.walletBalance = walletBalance;
    }
}
