package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.dto.WalletResponse;
import com.virtualmarket.polymarket.dto.WalletTransactionResponse;
import com.virtualmarket.polymarket.entity.User;
import com.virtualmarket.polymarket.enums.UserRole;
import com.virtualmarket.polymarket.service.WalletApiService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {

    private final WalletApiService walletApiService;

    public WalletController(WalletApiService walletApiService) {
        this.walletApiService = walletApiService;
    }

    @GetMapping("/user/{userId}")
    public WalletResponse getWalletByUserId(@PathVariable Long userId, Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        if (!currentUser.getId().equals(userId) && currentUser.getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot access another user's wallet");
        }

        return walletApiService.getWalletByUserId(userId);
    }

    @GetMapping("/user/{userId}/transactions")
    public List<WalletTransactionResponse> getWalletTransactionsByUserId(
            @PathVariable Long userId,
            Authentication authentication
    ) {
        User currentUser = getCurrentUser(authentication);
        if (!currentUser.getId().equals(userId) && currentUser.getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot access another user's wallet transactions");
        }

        return walletApiService.getWalletTransactionsByUserId(userId);
    }

    @GetMapping("/me")
    public WalletResponse getMyWallet(Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        return walletApiService.getWalletByUserId(currentUser.getId());
    }

    @GetMapping("/me/transactions")
    public List<WalletTransactionResponse> getMyWalletTransactions(Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        return walletApiService.getWalletTransactionsByUserId(currentUser.getId());
    }

    private User getCurrentUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication is required");
        }
        return user;
    }
}
