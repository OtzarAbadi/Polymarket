package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.dto.WalletResponse;
import com.virtualmarket.polymarket.dto.WalletTransactionResponse;
import com.virtualmarket.polymarket.service.WalletApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {

    private final WalletApiService walletApiService;

    public WalletController(WalletApiService walletApiService) {
        this.walletApiService = walletApiService;
    }

    @GetMapping("/user/{userId}")
    public WalletResponse getWalletByUserId(@PathVariable Long userId) {
        return walletApiService.getWalletByUserId(userId);
    }

    @GetMapping("/user/{userId}/transactions")
    public List<WalletTransactionResponse> getWalletTransactionsByUserId(@PathVariable Long userId) {
        return walletApiService.getWalletTransactionsByUserId(userId);
    }
}
